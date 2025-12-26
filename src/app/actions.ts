'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

export async function generateManagementPlan(formData: FormData) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("APIキーが見つかりません");

  const genAI = new GoogleGenerativeAI(apiKey);

  // ▼▼▼ 自動切り替えリスト ▼▼▼
  const modelCandidates = [
    'gemini-2.0-flash-lite-preview-02-05', // ① 実績あり：最優先
    'gemini-2.0-flash-exp',              // ② 予備
    'gemini-1.5-flash',                  // ③ 標準
    'gemini-1.5-flash-latest',           // ④ 予備
    'gemini-flash-latest',               // ⑤ 汎用
    'gemini-pro'                         // ⑥ 最後の砦
  ];

  // --- 入力項目の取得 ---
  const industry = formData.get('industry') as string || '（未入力）';
  const businessDetail = formData.get('businessDetail') as string || '（未入力）';
  const hqLocation = formData.get('hqLocation') as string || '（未入力）';
  const otherLocations = formData.get('otherLocations') as string || 'なし';
  const businessArea = formData.get('businessArea') as string || '（未入力）';
  const employeeCount = formData.get('employeeCount') as string || '（未入力）';
  const futureEmployeeCount = formData.get('futureEmployeeCount') as string || '現状維持';
  const strengths = formData.get('strengths') as string || '（未入力）';
  const issues = formData.get('issues') as string || '（未入力）';
  const newInitiatives = formData.get('newInitiatives') as string || '特になし';
  const targetCustomers = formData.get('targetCustomers') as string || '（未入力）';
  const acquisitionChannel = formData.get('acquisitionChannel') as string || '（未入力）';
  const vision = formData.get('vision') as string || '（未入力）';

  // ▼▼▼ プロンプト（数量指定・役割・視認性を全て統合した最終版） ▼▼▼
  const prompt = `
あなたは**世界最高の経営コンサルタント兼マーケッター兼編集者**です。
私は社員20名以下の小規模企業の経営者です。
私の会社の強みを最大限に活かし、読み手の心を動かす『経営計画書（全8章）』を作成してください。

【★最重要指示：内容の質と量（コンサルタントとしての責任）】
1. **数量の厳守**：SWOT分析は各要素3つ以上、クロスSWOTも各戦略3つ以上、第8章の施策は計50項目（5区分×10個）を必ず出力してください。数が足りない場合は不合格です。
2. **省略・要約の禁止**：AIによくある「抽象的なまとめ」は禁止です。具体的かつ詳細に記述してください。
3. **熱量のある文章**：形式的なビジネス文書ではなく、経営者の情熱が伝わる言葉を選んでください。

【★出力形式：視認性の確保（編集者としての責任）】
Wordやメールに貼り付けてそのまま使えるよう、以下の「プレーンテキスト形式」を厳守してください。
* **Markdown記号の禁止**：「#」「*」「-」「|」「**」などの記号は**絶対に使用しないでください**。
* **表組み（テーブル）の禁止**：表は崩れるため使用せず、見やすい「リスト形式」で記述してください。
* **見出しの統一**：大見出しは「■」、小見出しは「【 】」を使用してください。
* **改行の徹底**：「見出し」の直後には必ず改行を入れ、本文を次の行から始めてください。

【入力情報（ヒアリングシート）】
1. 業種： ${industry}
2. 事業内容の詳細： ${businessDetail}
3. 本社所在地： ${hqLocation}
4. その他拠点： ${otherLocations}
5. 営業エリア（商圏）： ${businessArea}
6. 現在の社員数： ${employeeCount}
7. 5年後の希望社員数： ${futureEmployeeCount}
8. 顧客から褒められる点（強み）： ${strengths}
9. 困っている点（課題）： ${issues}
10. これから新しくやりたいこと： ${newInitiatives}
11. どんなお客様に来てもらっているか： ${targetCustomers}
12. お客様の流入経路： ${acquisitionChannel}
13. どんな会社にしていきたいか（想い）： ${vision}
---------------------------

■ 経営計画書の構成（全8章）
1. 会社概要
2. これから目指す姿（将来構想）
3. 今の状況を知る（SWOT分析）： 
   ★表は使わずリスト形式で記述。
   ★「強み」「弱み」「機会」「脅威」を**【各3項目以上】**必ず挙げてください。
4. 分析を活かす作戦（クロスSWOT）： 
   ★表は使わず文章で記述。
   ★「SO戦略」「WO戦略」「ST戦略」「WT戦略」を**【各3項目以上】**必ず提案してください。
5. 私たちの立ち位置（戦略の優先順位）： ★後述のルールに基づきAIが分析・決定。
6. 中期目標： 年度別に数値目標や状態目標を記述。
7. 商圏・市場戦略： ターゲットやエリア戦略を具体的に。
8. 戦略と施策： 
   ★5区分すべてにおいて、必ず**【10項目ずつ（計50項目）】**書き出してください。
   ★単語ではなく、具体的な行動文章で書くこと。

■ 第5章「私たちの立ち位置」の選択ルール（定義厳守）
以下の定義に基づき、入力情報（${businessDetail}、${strengths}、${industry}）を分析し、最適な組み合わせを選んでください。
**「答えありき」にならず、入力された事業内容と強みに最も適した戦略を選定してください。**

[定義]
* 商品：提供する物品、または**提供する役務（サービスそのもの）**の品質、機能、正確さ。
* サービス：**契約や購入の前後に付随する対応の質**。マナー、フォロー体制、気配り。
* 価格：市場相場との整合性や、納得感。
* アクセス：物理的な利便性だけでなく、**専門的な解決策・情報への橋渡し（知的利便性）**を含む。
* 経験価値：顧客が抱く安心感。（※構築難易度が高いため、今回は必ず基盤要素とする）

[選択基準]
1. 【最優先（市場支配レベル - 1つ）】
   事業内容と強みを分析し、他社を圧倒できる要素（商品、価格、アクセス、サービスのいずれか）。
   ※「経験価値」は最優先に選ばないこと。
2. 【優先（差別化レベル - 1つ）】
   2番目に強い要素。
   ※「経験価値」はここにも選ばないこと。
3. 【基盤（一般レベル - 3つ）】
   残りの3つ。ここには必ず「経験価値」を含めること。

■ 第8章「戦略と施策」の5区分（計50項目・省略禁止）
1. 商品・サービスをどうするか
2. お客様にどう伝えるか（営業・販促）
3. 仕事の進め方と品質
4. 働く仲間とチームづくり
5. ムダをなくすデジタル活用

--------------------------------------------------
（以下、出力レイアウト見本。この形式を守り、中身は濃く記述すること）

■ 第1章 会社概要

【会社名】
　（入力された会社名）

【代表者】
　（代表者名）

■ 第3章 今の状況を知る（SWOT分析）

【強み】
1. 顧客対応のスピード
　 大手には真似できない即日対応を徹底しており、顧客からの信頼が厚い。緊急時のトラブル対応においても、他社より平均2時間早く到着できている。

2. ...（必ず3つ以上書く）

--------------------------------------------------

【出力後の案内】 
計画書の本文が終わった後に、区切り線（--------------------------------------------------）を引き、必ず以下の形式で利用者への案内を出力してください。

--------------------------------------------------
【この経営計画書の使い方】

この計画書は、コピーしてそのままWordやドキュメントに貼り付けられる形式で作成しました。

1. 保存方法
   画面上に表示されている「全文をコピーする」ボタンを押してください。
   計画書の内容がすべてコピーされますので、その後GoogleドキュメントやWordに貼り付けて保存してください。

2. 活用のアドバイス
   スライド資料にする場合は、この計画書を原稿として利用するか、専門業者への依頼資料としてご活用ください。

3. 免責事項
   本内容はAIが業界知識やヒアリング情報を基に作成した「参考情報」です。
   売上高や利益計画などの詳細な「数値計画」は出力されません。
   経営実態と異なる箇所がないかご自身で確認・修正し、最終的な判断は利用者様の責任において行ってください。
`;

  let lastError = null;

  for (const modelName of modelCandidates) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.warn(`⚠️ モデル ${modelName} は使用できませんでした。次を試します...`);
      lastError = error;
    }
  }

  console.error("全モデル全滅:", lastError);
  throw new Error("現在、アクセス集中により応答しづらくなっています。恐れ入りますが、しばらく時間（1〜2分程度）を空けてから、再度お試しください。");
}
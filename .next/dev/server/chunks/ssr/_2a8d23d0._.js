module.exports = [
"[project]/src/app/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"402de835c6f2b7e0fd639fbdf46f55bf2fe54478bf":"generateManagementPlan"},"",""] */ __turbopack_context__.s([
    "generateManagementPlan",
    ()=>generateManagementPlan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
async function generateManagementPlan(formData) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("APIキーが見つかりません。.env.localを確認してください。");
    }
    // 入力項目の取得
    const industry = formData.get('industry') || '（未入力：業界知識をもとに補完してください）';
    const businessDetail = formData.get('businessDetail') || '（未入力：一般的な業務内容として補完してください）';
    const hqLocation = formData.get('hqLocation') || '（未入力：一般的な地方都市として想定してください）';
    const otherLocations = formData.get('otherLocations') || 'なし';
    const businessArea = formData.get('businessArea') || '（未入力：一般的な商圏として補完してください）';
    const employeeCount = formData.get('employeeCount') || '（未入力：小規模事業者として想定してください）';
    const futureEmployeeCount = formData.get('futureEmployeeCount') || 'なし（現状維持）';
    const strengths = formData.get('strengths') || '（未入力：この業種の一般的な強みを補完してください）';
    const issues = formData.get('issues') || '（未入力：この業種の一般的な課題を補完してください）';
    const newInitiatives = formData.get('newInitiatives') || '（未入力：特になし。架空の新規事業は提案せず、既存事業の強化・改善・品質向上を軸に計画してください）';
    const targetCustomers = formData.get('targetCustomers') || '（未入力：一般的なターゲット層を想定してください）';
    const acquisitionChannel = formData.get('acquisitionChannel') || '（未入力：一般的な集客経路を想定してください）';
    const vision = formData.get('vision') || '（未入力：持続的な成長と地域貢献）';
    // 指示文（プロンプト）
    const prompt = `
あなたは**世界最高の**経営コンサルタント兼マーケッター兼編集者です。 私は社員20名以下の小規模企業の経営者です。これから『経営計画書』を作りたいので、以下の条件を満たす計画書を作成してください。

【極めて重要な依頼：省略の禁止】
今回は**「第1章から第8章まで」**を作成してください。 AIによる情報の要約や抜粋は一切求めていません。全章において省略や抜粋をせず、第8章の施策50項目についても、すべて具体的な文章で書き出してください。 ボリューム不足や項目の欠落はエラーとみなします。出力がどれだけ長くなっても構いませんので、一文字も妥協せず完遂してください。

【入力方法】
以下の「ヒアリングシート（入力フォーム内容）」の情報を骨格とし、分析や行動例に必ず反映してください。
情報が「未入力」または不足している場合は、あなたの持つ高度な業界知識をもとに最適解を補完してください。

--- ヒアリングシート（入力フォーム内容） ---
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

🏗️ 経営計画書の構成（全8章）
1. 会社概要
2. これから目指す姿（将来構想）
3. 今の状況を知る（SWOT分析）： 強み・弱み・機会・脅威を各3項目以上、Markdown表で提示。
4. 分析を活かす作戦（クロスSWOT）： SO・WO・ST・WTを各3項目以上、Markdown表で提示。
5. 私たちの立ち位置（戦略の優先順位）： 下記の定義に基づき、3つのレベルに必ず振り分ける。
6. 中期目標： 5年後までの年度別目標を具体的に提示。
7. 商圏・市場戦略： 地域密着か広域か、具体的なターゲットを含めて提示。
8. 戦略と施策（★省略禁止★）： 5区分すべてを10項目ずつ（計50項目）、具体的な行動リストとして出力。

📋 「私たちの立ち位置」戦略の定義
アクセス： 物理的な利便性（立地、反応の速さ）に加え、**知的・機能的利便性（専門的な情報、高度なスキル、解決策への接触可能性）**も含む。
商品： 提供する物品、または提供する役務（サービスそのもの）の品質、機能、正確さ、ブランドとしての信頼性。
サービス： 契約や購入の前後に付随する対人対応の質。マナー、アフターフォロー、気配りの徹底。
価格： 市場相場との整合性と「納得感」のある値付け。
経験価値： **顧客が抱く精神的な満足感や安心感。**自社はそれが生まれる「舞台」を徹底的に設計する。

📋 戦略と施策の5区分（各10項目・計50項目すべて出力）
1. 商品・サービスをどうするか
2. お客様にどう伝えるか（営業・販促）
3. 仕事の進め方と品質
4. 働く仲間とチームづくり
5. ムダをなくすデジタル活用

🗣️ 出力トーンと形式
トーン： 正式文書トーン（外部提出可）。難しい言葉を避け、自然体で読みやすく。
形式： Googleドキュメントに貼り付け可能なMarkdown形式。各章冒頭に「方向性・想い」を一文添える。
**【重要】読みやすさを確保するため、各段落や項目の間には十分な改行を入れて出力してください。**

【出力後の案内】 
計画書の本文が終わった後に、区切り線（---）を引き、必ず以下の形式で利用者への案内を出力してください（改行も再現すること）。

---
**【この経営計画書の使い方】**

この計画書は、Googleドキュメント等に貼り付けてそのままお使いいただける形式で作成しました。

1. **保存方法（重要）**
   画面上に表示されている**「全文をコピーする」ボタン**を押してください。
   計画書の内容がすべてコピーされますので、その後GoogleドキュメントやWordに貼り付けて保存してください。

2. **活用のアドバイス**
   スライド資料にする場合は、この計画書を原稿として利用するか、専門業者への依頼資料としてご活用ください。

3. **免責事項**
   本内容はAIが業界知識やヒアリング情報を基に作成した「参考情報」です。
   売上高や利益計画などの詳細な「数値計画」は出力されません。
   経営実態と異なる箇所がないかご自身で確認・修正し、最終的な判断は利用者様の責任において行ってください。
`;
    // ▼▼▼ 修正箇所：診断リストにあった「実験版（exp）」を指定 ▼▼▼
    // これなら無料枠の制限が別枠なので、通る可能性が高いです！
    const modelName = 'gemini-2.0-flash-exp';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
    const payload = {
        contents: [
            {
                parts: [
                    {
                        text: prompt
                    }
                ]
            }
        ]
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!response.ok) {
            // エラーがあれば詳細を表示
            const errorMessage = data.error?.message || response.statusText;
            console.error("Gemini API Error:", data);
            throw new Error(`AIエラー: ${errorMessage}`);
        }
        // 成功した場合、テキストを取り出す
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
            throw new Error("AIからの応答が空でした。");
        }
        return text;
    } catch (error) {
        console.error('通信エラー:', error);
        throw new Error(error.message || '予期せぬエラーが発生しました');
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    generateManagementPlan
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(generateManagementPlan, "402de835c6f2b7e0fd639fbdf46f55bf2fe54478bf", null);
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "402de835c6f2b7e0fd639fbdf46f55bf2fe54478bf",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateManagementPlan"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions.ts [app-rsc] (ecmascript)");
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=_2a8d23d0._.js.map
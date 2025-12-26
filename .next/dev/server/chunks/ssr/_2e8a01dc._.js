module.exports = [
"[project]/src/app/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"402de835c6f2b7e0fd639fbdf46f55bf2fe54478bf":"generateManagementPlan"},"",""] */ __turbopack_context__.s([
    "generateManagementPlan",
    ()=>generateManagementPlan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@google/generative-ai/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdf$2d$parse$2f$dist$2f$pdf$2d$parse$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/pdf-parse/dist/pdf-parse/esm/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdf$2d$parse$2f$dist$2f$pdf$2d$parse$2f$esm$2f$PDFParse$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pdf-parse/dist/pdf-parse/esm/PDFParse.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
const genAI = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](process.env.GEMINI_API_KEY || '');
async function generateManagementPlan(formData) {
    const file = formData.get('file');
    if (!file) {
        throw new Error('ファイルがアップロードされていません。');
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // PDFからテキストを抽出
    let extractedText = '';
    try {
        const parser = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdf$2d$parse$2f$dist$2f$pdf$2d$parse$2f$esm$2f$PDFParse$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PDFParse"]({
            data: buffer
        });
        const result = await parser.getText();
        extractedText = result.pages.map((p)=>p.text).join('\n');
    } catch (error) {
        console.error('PDF parsing error:', error);
        throw new Error('PDFの読み取りに失敗しました。');
    }
    if (!extractedText.trim()) {
        throw new Error('PDFからテキストを抽出できませんでした。');
    }
    const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash'
    });
    const prompt = `
あなたはプロの経営コンサルタント兼マーケッター兼編集者です。 私は社員20名以下の小規模企業の経営者です。これから『経営計画書』を作りたいので、以下の条件を満たす計画書を作成してください。
【極めて重要な依頼：省略の禁止】 今回は**「第1章から第8章まで」**を作成してください。 AIによる情報の要約や抜粋は一切求めていません。全章において省略や抜粋をせず、第8章の施策50項目についても、すべて具体的な文章で書き出してください。 ボリューム不足や項目の欠落はエラーとみなします。出力がどれだけ長くなっても構いませんので、一文字も妥協せず完遂してください。
🔗 参考情報の扱い方 【参考URL】
URL1：
URL2：
URL3：
URL4：
【入力方法】 アップロードされた「ヒアリングシート（PDF）」の情報を骨格とし、URLやPDFがある場合はその内容を分析や行動例に必ず反映してください。無い場合は、業界知識をもとに補完してください。

--- ヒアリングシートの内容 ---
${extractedText}
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

【出力後の案内】 出力完了後、次のように尋ねてください。 「この経営計画書は、Googleドキュメントに貼り付けてお使いいただける形式で作成しました。このままテキスト全体をコピー＆ペーストして保存されることをおすすめします。Wordで出力したい場合は、一旦Googleドキュメントに貼り付け、その後『ファイル』＞『ダウンロード』＞『Microsoft Word（.docx）』を選択すると、きれいに保存できます。スライドにしたい場合は、ご自身で作成されるか、この計画書を原稿として専門業者に依頼されてみてください。
なお、本内容はAIが業界知識やヒアリングシートに基づき作成した『参考情報』です。経営実態との相違がないか必ずご自身で内容を確認・修正し、正確性を高めた上でご活用ください。本資料の利用に関する最終的な判断と責任は、利用者様に帰属いたします。
`;
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API error:', error);
        throw new Error('AIによる生成中にエラーが発生しました。');
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
];

//# sourceMappingURL=_2e8a01dc._.js.map
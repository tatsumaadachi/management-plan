'use client';

import { useState } from 'react';
import { generateManagementPlan } from './actions';

export default function Home() {
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // 確実にアニメーションさせるための送信処理
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // 画面リロードを阻止
    
    setIsLoading(true); // 即座に読み込み中に切り替え
    setError('');
    setResult('');
    
    try {
      const formData = new FormData(e.currentTarget);
      const text = await generateManagementPlan(formData);
      setResult(text);
    } catch (e) {
      setError(e instanceof Error ? e.message : '予期せぬエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    alert('計画書をコピーしました！\nご自身のGoogleドキュメントやWordに貼り付けて保存してください。');
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* ヘッダー */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#0d0864] text-white py-4 px-12 rounded shadow-lg text-center inline-block">
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
              経営計画作成アプリ
            </h1>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          
          {/* ヒントエリア */}
          <div className="mb-10">
            <p className="text-gray-600 text-sm text-center mb-4">
              以下の各項目について、画面のフォームに直接入力してください。
            </p>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-5 text-orange-900 text-sm shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-2 text-[#d35400]">
                {/* ヒントアイコン */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                <span className="font-bold text-lg">活用のヒント</span>
              </div>
              <p className="text-center leading-relaxed">
                入力内容が詳しいほど、御社の実情に合った<br className="hidden md:block"/>
                「具体的で精度の高い計画書」を作成できます。<br/>
                <span className="text-xs opacity-80 mt-1 inline-block">（箇条書きでも構いませんので、強みやエピソードをたくさん入力してください）</span>
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-8">
            
            {/* 1. 業種 & 2. 事業内容 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-bold mb-2 text-sm text-slate-700">1. 業種</label>
                <input name="industry" placeholder="例：不動産販売業、飲食業" className="w-full p-3 border border-gray-300 rounded text-gray-900 bg-white focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none transition" />
              </div>
              
              <div className="md:col-span-2">
                 <label className="block font-bold mb-2 text-sm text-slate-700">2. どんな事業をしていますか？（業種について詳しく）</label>
                 <textarea name="businessDetail" rows={3} placeholder="例：〇〇エリアを中心に、〇〇向けの〇〇サービスを提供しています。" className="w-full p-3 border border-gray-300 rounded text-gray-900 bg-white focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none transition" />
              </div>
            </div>

            {/* 3. 本社 & 4. その他拠点 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-bold mb-2 text-sm text-slate-700">3. 本社事務所の所在地</label>
                <input name="hqLocation" placeholder="例：◯◯県◯◯市" className="w-full p-3 border border-gray-300 rounded text-gray-900 bg-white focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none transition" />
              </div>
              <div>
                <label className="block font-bold mb-2 text-sm text-slate-700">4. 本社以外の拠点と内容</label>
                <input name="otherLocations" placeholder="例：◯◯県◯◯市 資材置き場（なければ空欄）" className="w-full p-3 border border-gray-300 rounded text-gray-900 bg-white focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none transition" />
              </div>
            </div>

            {/* 5. 営業エリア */}
            <div>
              <label className="block font-bold mb-2 text-sm text-slate-700">5. 営業エリア（商圏）</label>
              <input name="businessArea" placeholder="例：〇〇県全域、〇〇市から車で30分圏内、全国 など" className="w-full p-3 border border-gray-300 rounded text-gray-900 bg-white focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none transition" />
            </div>

            {/* 6. 社員数 */}
            <div>
              <label className="block font-bold mb-2 text-sm text-slate-700">6. 社員数</label>
              <input name="employeeCount" placeholder="例：役員〇名、正社員〇名、パート・アルバイト〇名" className="w-full p-3 border border-gray-300 rounded text-gray-900 bg-white focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none transition" />
            </div>

            {/* 7. 希望社員数 */}
            <div>
              <label className="block font-bold mb-2 text-sm text-slate-700">7. 5年後に何人くらいの社員数にしたいか</label>
              <input name="futureEmployeeCount" placeholder="希望がない場合は「なし」と入力" className="w-full p-3 border border-gray-300 rounded text-gray-900 bg-white focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none transition" />
            </div>

            {/* 8. 強み */}
            <div>
              <label className="block font-bold mb-2 text-sm text-slate-700">8. 顧客から褒められるときにかけられる言葉や「御社のいいところ」と言われる点</label>
              <textarea name="strengths" rows={3} placeholder="例：「いつも対応が早くて助かる」「〇〇さんのところは親切だね」など、実際に言われた言葉や評価されているポイントを書いてください" className="w-full p-3 border border-gray-300 rounded text-gray-900 bg-white focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none transition" />
            </div>

            {/* 9. 課題 */}
            <div>
              <label className="block font-bold mb-2 text-sm text-slate-700">9. 「ここが足りない」「困っている」と感じる点</label>
              <textarea name="issues" rows={3} placeholder="現在の悩みや、解決したい課題を書いてください" className="w-full p-3 border border-gray-300 rounded text-gray-900 bg-white focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none transition" />
            </div>

            {/* 10. 新しくやりたいこと */}
            <div>
              <label className="block font-bold mb-2 text-sm text-slate-700">10. これから新しくやりたいこと（新規出店、商品開発、人材育成など）</label>
              <textarea name="newInitiatives" rows={3} placeholder="単語ではなく、具体的に書いてください（例：〇〇向けの新規商品を開発したい、〇〇エリアに2店舗目を出したい、など）" className="w-full p-3 border border-gray-300 rounded text-gray-900 bg-white focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none transition" />
            </div>

            {/* 11. 顧客層 */}
            <div>
              <label className="block font-bold mb-2 text-sm text-slate-700">11. どんなお客様に来てもらっていますか？</label>
              <input name="targetCustomers" placeholder="例：地元の建設業の企業、30代の子育てファミリー層 など" className="w-full p-3 border border-gray-300 rounded text-gray-900 bg-white focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none transition" />
            </div>

            {/* 12. 流入経路 */}
            <div>
              <label className="block font-bold mb-2 text-sm text-slate-700">12. そのお客様は、どこから流入していますか？</label>
              <input name="acquisitionChannel" placeholder="例：紹介、来店、ホームページ、SNS、ポータルサイトなど" className="w-full p-3 border border-gray-300 rounded text-gray-900 bg-white focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none transition" />
            </div>

            {/* 13. 想い */}
            <div>
              <label className="block font-bold mb-2 text-sm text-slate-700">13. どんな会社にしていきたいですか？（大切にしている思いや考え方）</label>
              <textarea name="vision" rows={4} placeholder="短い文章ではなく、あなたの経営に対する熱い想いや、大切にしている価値観を詳しく書いてください" className="w-full p-3 border border-gray-300 rounded text-gray-900 bg-white focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none transition" />
            </div>

            {/* ボタンと注意書きエリア */}
            <div className="mt-8 space-y-6">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#e67e22] text-white font-bold py-4 rounded-lg hover:opacity-90 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:bg-gray-400 disabled:shadow-none text-lg flex justify-center items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {/* ▼▼▼ ここを修正しました（「AIが」を削除） ▼▼▼ */}
                    <span>作成中... (約1〜2分)</span>
                  </>
                ) : (
                  '経営計画書を作成する'
                )}
              </button>
              
              <p className="text-center text-sm font-bold text-[#d35400] leading-relaxed">
                ⚠️ 作成された計画書はアプリ内に自動保存されません。<br/>
                生成後に「全文をコピー」し、<span className="underline decoration-dotted">GoogleドキュメントやWord等に貼り付けて</span>保存してください。
              </p>

              <div className="bg-gray-50 p-4 rounded border border-gray-200 text-xs text-gray-500 leading-relaxed">
                <p className="font-bold mb-2 text-gray-700">【免責事項】</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>本アプリはAIを活用して経営計画書の原案を作成する支援ツールです。</li>
                  <li><span className="font-bold">売上高や利益計画などの詳細な「数値計画」は出力されません。</span>必要な場合は別途作成してください。</li>
                  <li>生成された内容には、事実と異なる情報や架空の提案が含まれる可能性があります。</li>
                  <li>必ずご自身で内容を確認・修正し、最終的な経営判断は利用者様の責任において行ってください。</li>
                  <li>本アプリの使用により生じた損害について、開発者は一切の責任を負いかねます。</li>
                </ul>
              </div>
            </div>

          </form>
          
          {error && <p className="text-red-600 mt-4 text-center font-bold bg-red-50 p-3 rounded">{error}</p>}
        </div>

        {/* 結果表示エリア */}
        {result && (
          <div className="mt-12">
             <div className="flex justify-between items-end mb-4 px-2">
              <h2 className="text-2xl font-bold text-slate-800">作成結果</h2>
              <button 
                onClick={handleCopy}
                className="bg-[#0d0864] text-white px-6 py-2 rounded hover:opacity-90 shadow-sm font-bold transition"
              >
                全文をコピーする
              </button>
            </div>
            
            <div className="prose max-w-none bg-white text-gray-900 p-8 rounded-lg shadow-xl border border-gray-200 whitespace-pre-wrap leading-relaxed">
              {result}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center text-yellow-800">
              <p className="text-sm font-bold">
                ⚠️ 内容は自動保存されません
              </p>
              <p className="text-sm mt-1 opacity-90 leading-relaxed">
                上の「全文をコピーする」ボタンを押し、<span className="font-bold">GoogleドキュメントやWord、メモ帳などに貼り付けて</span>保存してください。
              </p>
            </div>
          </div>
        )}

        <footer className="mt-12 text-center text-sm text-gray-400 pb-8">
          <p>&copy; {new Date().getFullYear()} L.I.G Partners Co., Ltd. All Rights Reserved.</p>
        </footer>

      </div>
    </main>
  );
}
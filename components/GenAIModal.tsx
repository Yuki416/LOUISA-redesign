import React, { useState } from 'react';
import { X, Sparkles, Image as ImageIcon, Loader2 } from 'lucide-react';
import { ImageSize } from '../types';

interface GenAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GenAIModal: React.FC<GenAIModalProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>('1K');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      // 模擬網路請求延遲 (Simulate network delay)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 使用 Unsplash 的隨機咖啡圖片作為模擬結果
      // 加上隨機參數讓每次看起來有點不同
      const randomSig = Math.floor(Math.random() * 1000);
      const mockImage = `https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop&sig=${randomSig}`;
      
      setGeneratedImageUrl(mockImage);

    } catch (err: any) {
      console.error("Generation failed:", err);
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-orange-500 text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <h2 className="font-bold text-lg">AI 創意特調 (體驗版)</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-orange-600 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  您想喝什麼？描述您的夢幻飲品：
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none h-24"
                  placeholder="例如：一杯漂浮著玫瑰花瓣的金色氣泡拿鐵，背景是夕陽下的巴黎..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  畫質選擇 (Size)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['1K', '2K', '4K'] as ImageSize[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`py-2 rounded-lg text-sm font-medium border transition-all ${
                        size === s
                          ? 'bg-orange-50 text-orange-600 border-orange-500'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                  {error}
                </div>
              )}

              {generatedImageUrl ? (
                <div className="mb-6">
                   <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                      <img src={generatedImageUrl} alt="Generated Drink" className="w-full h-auto object-contain" />
                   </div>
                   <p className="text-xs text-center text-gray-400 mt-2">AI 生成圖片僅供參考 (模擬展示)</p>
                </div>
              ) : (
                <div className="mb-6 h-64 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400">
                   {isLoading ? (
                     <div className="flex flex-col items-center">
                       <Loader2 className="w-8 h-8 animate-spin text-orange-500 mb-2" />
                       <span className="text-sm">正在調製您的飲品...</span>
                     </div>
                   ) : (
                     <>
                       <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                       <span className="text-sm">生成的圖片將顯示於此</span>
                     </>
                   )}
                </div>
              )}
            </>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-white transition-all ${
                isLoading || !prompt.trim()
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-200'
              }`}
            >
              {isLoading ? '生成中...' : '開始生成'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default GenAIModal;
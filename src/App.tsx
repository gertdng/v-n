import { useState, useMemo } from 'react';
import { Check, X, ArrowRight, RotateCcw } from 'lucide-react';

const QUESTIONS = [
  {
    question: "Hoàn cảnh ra đời: Bài văn tế được viết để tưởng niệm các nghĩa sĩ hy sinh trong trận đánh nào?",
    options: [
      "Trận tập kích đồn Pháp tại Cần Giuộc năm 1861.",
      "Trận Ất Dậu 1885 tại kinh thành Huế.",
      "Trận Rạch Gầm - Xoài Mút năm 1785.",
      "Trận Điện Biên Phủ năm 1954."
    ],
    correctAnswer: "Trận tập kích đồn Pháp tại Cần Giuộc năm 1861.",
    explanation: "Trận tập kích đồn Pháp tại Cần Giuộc năm 1861."
  },
  {
    question: "Bố cục: Một bài văn tế cổ điển (như tác phẩm này) thường gồm mấy phần?",
    options: [
      "2 phần (Cảnh và Tình).",
      "3 phần (Mở bài, Thân bài, Kết bài).",
      "4 phần (Lung khởi, Thích thực, Ai vãn, Kết).",
      "5 phần (Khai, Thừa, Chuyển, Hợp, Kết)."
    ],
    correctAnswer: "4 phần (Lung khởi, Thích thực, Ai vãn, Kết).",
    explanation: "4 phần (Lung khởi, Thích thực, Ai vãn, Kết)."
  },
  {
    question: "Ý nghĩa phần Lung khởi: Hai câu đầu (\"Súng giặc đất rền\" / \"Lòng dân trời tỏ\") khẳng định điều gì?",
    options: [
      "Sự thất bại không thể tránh khỏi của nghĩa quân Cần Giuộc.",
      "Khẳng định chính nghĩa sáng ngời của dân ta đối lập với sức mạnh bạo tàn của giặc.",
      "Sự mạnh mẽ của vũ khí quân thù.",
      "Miêu tả khung cảnh thiên nhiên hoang tàn sau trận chiến."
    ],
    correctAnswer: "Khẳng định chính nghĩa sáng ngời của dân ta đối lập với sức mạnh bạo tàn của giặc.",
    explanation: "Khẳng định chính nghĩa sáng ngời của dân ta đối lập với sức mạnh bạo tàn của giặc."
  },
  {
    question: "Xuất thân: Trước khi cầm súng đánh giặc, những người anh hùng này là ai?",
    options: [
      "Những sĩ phu yêu nước giàu có.",
      "Những người quan lại trong triều đình.",
      "Những người nông dân nghèo khổ, \"cui cút làm ăn\".",
      "Những lính đánh thuê thiện chiến."
    ],
    correctAnswer: "Những người nông dân nghèo khổ, \"cui cút làm ăn\".",
    explanation: "Những người nông dân nghèo khổ, \"cui cút làm ăn\"."
  },
  {
    question: "Kỹ năng binh nghiệp: Thái độ của họ đối với việc binh đao trước khi giặc đến như thế nào?",
    options: [
      "Hoàn toàn xa lạ (\"Chưa quen cung ngựa, đâu tới trường nhung\").",
      "Rất tinh thông và luôn sẵn sàng.",
      "Từng được rèn luyện quân sự quy củ từ nhỏ.",
      "Đã có kinh nghiệm sau nhiều trận chiến lớn."
    ],
    correctAnswer: "Hoàn toàn xa lạ (\"Chưa quen cung ngựa, đâu tới trường nhung\").",
    explanation: "Hoàn toàn xa lạ (\"Chưa quen cung ngựa, đâu tới trường nhung\")."
  },
  {
    question: "Vũ khí trang bị: Những vật dụng nào được họ dùng làm vũ khí khi ra trận?",
    options: [
      "Gươm sắc và đạn đại bác.",
      "Súng trường và áo giáp sắt.",
      "Ngọn tầm vông, dao phay, rơm con cúi.",
      "Cung tên và giáo mác."
    ],
    correctAnswer: "Ngọn tầm vông, dao phay, rơm con cúi.",
    explanation: "Ngọn tầm vông, dao phay, rơm con cúi."
  },
  {
    question: "Động lực chiến đấu: Tại sao họ lại tự nguyện đứng lên đánh Pháp?",
    options: [
      "Bị quan lại triều đình bắt ép.",
      "Do lòng yêu nước, căm thù giặc và ý thức trách nhiệm (\"mến nghĩa làm quân chiêu mộ\").",
      "Muốn lập công để được ban thưởng.",
      "Không còn nơi nào khác để đi."
    ],
    correctAnswer: "Do lòng yêu nước, căm thù giặc và ý thức trách nhiệm (\"mến nghĩa làm quân chiêu mộ\").",
    explanation: "Do lòng yêu nước, căm thù giặc và ý thức trách nhiệm (\"mến nghĩa làm quân chiêu mộ\")."
  },
  {
    question: "Vẻ đẹp hình tượng: Tại sao hình tượng nghĩa sĩ trong bài mang vẻ đẹp \"bi tráng\"?",
    options: [
      "Vì họ ra trận mang theo sự u buồn, tuyệt vọng.",
      "Vì họ chiến đấu ngoan cường nhưng vẫn oán trách số phận.",
      "Vì sự hy sinh tuy đau thương (bi) nhưng vô cùng oanh liệt, cao cả (tráng).",
      "Vì họ không biết đánh trận nhưng vẫn liều lĩnh."
    ],
    correctAnswer: "Vì sự hy sinh tuy đau thương (bi) nhưng vô cùng oanh liệt, cao cả (tráng).",
    explanation: "Vì sự hy sinh tuy đau thương (bi) nhưng vô cùng oanh liệt, cao cả (tráng)."
  },
  {
    question: "Nghệ thuật tả trận đánh: Tác giả sử dụng biện pháp gì để tái hiện sự quyết liệt của trận công đồn?",
    options: [
      "Sử dụng ngôn ngữ miêu tả tĩnh, từ từ, êm dịu.",
      "Sử dụng động từ mạnh, nhịp điệu dồn dập và phép đối.",
      "Sử dụng nhiều đại từ nhân xưng và câu cảm thán.",
      "Tập trung kể lại lịch sử đơn thuần."
    ],
    correctAnswer: "Sử dụng động từ mạnh, nhịp điệu dồn dập và phép đối.",
    explanation: "Sử dụng động từ mạnh, nhịp điệu dồn dập và phép đối."
  },
  {
    question: "Nội dung phần Ai vãn: Đoạn văn này tập trung thể hiện cảm xúc gì?",
    options: [
      "Niềm tiếc thương vô hạn của tác giả và nhân dân trước sự hy sinh của các nghĩa sĩ.",
      "Sự vui mừng sau khi kẻ thù rút lui.",
      "Sự giận dữ trách móc triều đình không gửi viện binh.",
      "Lời khích lệ tinh thần người dân tiếp tục chiến đấu."
    ],
    correctAnswer: "Niềm tiếc thương vô hạn của tác giả và nhân dân trước sự hy sinh của các nghĩa sĩ.",
    explanation: "Niềm tiếc thương vô hạn của tác giả và nhân dân trước sự hy sinh của các nghĩa sĩ."
  },
  {
    question: "Đặc điểm tiếng khóc: Tiếng khóc trong bài văn tế có gì khác biệt với tiếng khóc thông thường?",
    options: [
      "Chỉ là lời vĩnh biệt đơn thuần theo tập tục.",
      "Là tiếng khóc đau thương nhưng vắng đi sự tự hào.",
      "Chỉ là tiếng than vãn bi lụy của riêng tác giả.",
      "Là tiếng khóc đau thương nhưng tràn đầy tự hào, mang tầm vóc dân tộc."
    ],
    correctAnswer: "Là tiếng khóc đau thương nhưng tràn đầy tự hào, mang tầm vóc dân tộc.",
    explanation: "Là tiếng khóc đau thương nhưng tràn đầy tự hào, mang tầm vóc dân tộc."
  },
  {
    question: "Ngôn ngữ đặc sắc: Nguyễn Đình Chiểu đã sử dụng lớp ngôn ngữ nào để tạo sự gần gũi?",
    options: [
      "Hoàn toàn là ngôn ngữ cung đình đài các.",
      "Chủ yếu là từ Hán Việt cổ khó hiểu.",
      "Kết hợp từ ngữ trang trọng với khẩu ngữ, từ địa phương Nam Bộ.",
      "Chỉ dùng văn xuôi tự do."
    ],
    correctAnswer: "Kết hợp từ ngữ trang trọng với khẩu ngữ, từ địa phương Nam Bộ.",
    explanation: "Kết hợp từ ngữ trang trọng với khẩu ngữ, từ địa phương Nam Bộ."
  },
  {
    question: "Quan niệm sống chết: Câu văn nào khẳng định sự lựa chọn cái chết vinh quang của nghĩa sĩ?",
    options: [
      "\"Mắt chưa từng ngó, tai chưa từng nghe\".",
      "\"Thà thác mà đặng câu địch khái, về theo tổ phụ cũng vinh\".",
      "\"Bữa thấy bòng bong che trắng lốp\".",
      "\"Sống làm chi theo quân tả đạo, quăng vác đi cho nhọc\"."
    ],
    correctAnswer: "\"Thà thác mà đặng câu địch khái, về theo tổ phụ cũng vinh\".",
    explanation: "\"Thà thác mà đặng câu địch khái, về theo tổ phụ cũng vinh\"."
  },
  {
    question: "Thái độ với kẻ thù: Tác giả dùng những từ ngữ nào để thể hiện sự khinh bỉ quân xâm lược?",
    options: [
      "\"Mùi tinh chiên\", \"đồ tả đạo\", \"thằng hè\".",
      "\"Quân viễn chinh\", \"khách phương xa\".",
      "\"Thực dân\", \"kẻ thù đáng kính\".",
      "\"Người lính ngoại quốc\"."
    ],
    correctAnswer: "\"Mùi tinh chiên\", \"đồ tả đạo\", \"thằng hè\".",
    explanation: "\"Mùi tinh chiên\", \"đồ tả đạo\", \"thằng hè\"."
  },
  {
    question: "Giá trị lịch sử văn học: Bài văn này được coi là \"tượng đài\" gì trong văn học Việt Nam?",
    options: [
      "Tượng đài về lòng trung quân ái quốc của giới sĩ phu.",
      "Tượng đài bất hủ về vẻ đẹp tráng lệ của thiên nhiên Nam Bộ.",
      "Tượng đài bất hủ về người nông dân nghĩa sĩ đánh giặc cứu nước.",
      "Tượng đài về các bậc danh tướng trong lịch sử."
    ],
    correctAnswer: "Tượng đài bất hủ về người nông dân nghĩa sĩ đánh giặc cứu nước.",
    explanation: "Tượng đài bất hủ về người nông dân nghĩa sĩ đánh giặc cứu nước."
  }
];

export default function App() {
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'RESULT'>('START');
  
  // Choose random 8 questions
  const [selectedQuestions, setSelectedQuestions] = useState<typeof QUESTIONS>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const startGame = () => {
    // Shuffle options for all questions
    const shuffledQuestions = [...QUESTIONS]
      .sort(() => 0.5 - Math.random())
      .slice(0, 8) // Yêu cầu 8 câu hỏi
      .map(q => ({
        ...q,
        options: [...q.options].sort(() => 0.5 - Math.random())
      }));
      
    setSelectedQuestions(shuffledQuestions);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setGameState('PLAYING');
  };

  const handleSelect = (option: string) => {
    if (selectedOption) return; // Prevent double clicking
    setSelectedOption(option);
    if (option === selectedQuestions[currentIndex].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < selectedQuestions.length) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
    } else {
      setGameState('RESULT');
    }
  };

  if (gameState === 'START') {
    return (
      <div className="h-screen bg-paper flex flex-col items-center justify-center p-4 font-sans text-ink">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-card border border-ink-light p-10 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4 text-ink">Văn tế Nghĩa sĩ Cần Giuộc</h1>
          <p className="text-sm tracking-widest opacity-70 uppercase mb-8">Nguyễn Đình Chiểu • 1861</p>
          <p className="text-ink/80 mb-8 leading-relaxed">
            Trò chơi trắc nghiệm tìm hiểu về tác phẩm văn học nổi tiếng của nhà thơ Nguyễn Đình Chiểu. Bài thi gồm 8 câu hỏi ngẫu nhiên.
          </p>
          <button
            onClick={startGame}
            className="w-full sm:w-auto bg-olive text-white font-semibold py-3 px-8 rounded hover:opacity-90 uppercase tracking-widest transition-opacity"
          >
            Bắt Đầu Chơi
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'RESULT') {
    const wrongCount = selectedQuestions.length - score;
    return (
      <div className="h-screen bg-paper flex flex-col items-center justify-center p-4 font-sans text-ink">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-card border border-ink-light p-10 text-center">
          <h2 className="font-serif text-3xl font-bold mb-8 text-ink">Kết Quả</h2>
          
          <div className="flex justify-center flex-wrap gap-6 mb-8">
             <div className="bg-[#F0EDE4] border border-ink-light rounded-lg p-6 min-w-[120px]">
              <div className="text-[10px] uppercase opacity-60 text-emerald-700 font-bold mb-2 tracking-widest">Đúng</div>
              <div className="text-4xl font-bold text-ink">{score}</div>
            </div>
            <div className="bg-[#F0EDE4] border border-ink-light rounded-lg p-6 min-w-[120px]">
              <div className="text-[10px] uppercase opacity-60 text-rose-700 font-bold mb-2 tracking-widest">Sai</div>
              <div className="text-4xl font-bold text-ink">{wrongCount}</div>
            </div>
          </div>
          
          <p className="text-ink/80 mb-8 italic">
            Bạn đã hoàn thành bài thi với kết quả {score}/{selectedQuestions.length} câu chính xác.
          </p>

          <button
            onClick={startGame}
            className="flex items-center justify-center space-x-2 w-full sm:w-auto mx-auto bg-olive hover:opacity-90 text-white font-semibold py-3 px-8 rounded transition-opacity uppercase tracking-widest text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Chơi Lại</span>
          </button>
        </div>
      </div>
    );
  }

  const currentQ = selectedQuestions[currentIndex];
  const isAnswered = selectedOption !== null;
  const answeredCount = isAnswered ? currentIndex + 1 : currentIndex;
  const currentWrongCount = answeredCount - score;

  return (
    <div className="h-screen w-full flex flex-col bg-paper font-sans text-ink">
      {/* Header */}
      <header className="h-20 bg-ink text-white flex items-center justify-between px-6 sm:px-10 flex-shrink-0">
        <div>
          <h1 className="font-serif text-lg sm:text-2xl">Văn tế Nghĩa sĩ Cần Giuộc</h1>
          <p className="text-[10px] sm:text-xs tracking-widest opacity-70 uppercase mt-1">Nguyễn Đình Chiểu • 1861</p>
        </div>
        <div className="flex gap-4 sm:gap-8 items-center">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] uppercase opacity-60 font-medium">Tiến độ</p>
            <p className="font-semibold text-sm">Câu {currentIndex + 1} / {selectedQuestions.length}</p>
          </div>
          <div className="w-[1px] h-8 bg-white/20 hidden sm:block"></div>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-[10px] uppercase opacity-60 text-emerald-400 font-medium tracking-widest">Đúng</p>
              <p className="font-bold text-sm tracking-widest">{score.toString().padStart(2, '0')}</p>
            </div>
            <div className="text-center text-rose-400">
              <p className="text-[10px] uppercase opacity-60 text-rose-400 font-medium tracking-widest">Sai</p>
              <p className="font-bold text-sm tracking-widest">{currentWrongCount.toString().padStart(2, '0')}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col lg:grid lg:grid-cols-12 overflow-hidden h-full">
        {/* Left Col: Question and Options */}
        <section className="lg:col-span-8 p-6 sm:p-10 flex flex-col overflow-y-auto">
          <div className="mb-8 flex-shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-widest text-olive bg-[#F0EDE4] px-3 py-1 rounded">
              Câu hỏi {currentIndex + 1}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mt-6 leading-snug">
              {currentQ.question}
            </h2>
          </div>

          <div className="grid gap-4 mt-auto lg:mt-0 pb-4">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === currentQ.correctAnswer;
              
              let buttonStyles = "border border-ink hover:border-olive/40 hover:bg-white text-ink/80";
              let letterStyles = "border border-ink font-bold text-ink/40";

              if (isAnswered) {
                if (isCorrect) {
                  buttonStyles = "border-2 border-emerald-600 bg-emerald-50 text-ink";
                  letterStyles = "border-emerald-600 text-emerald-700";
                } else if (isSelected) {
                  buttonStyles = "border-2 border-rose-600 bg-rose-50 text-ink";
                  letterStyles = "border-rose-600 text-rose-700";
                } else {
                  buttonStyles = "border border-ink-light opacity-50 bg-transparent text-ink/50";
                  letterStyles = "border-ink-light text-ink/30";
                }
              } else if (isSelected) {
                 buttonStyles = "border-2 border-olive bg-olive/5 text-ink";
                 letterStyles = "border-olive text-olive";
              }

              const letters = ['A', 'B', 'C', 'D'];

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(option)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 sm:p-5 rounded-lg flex items-center transition-all ${buttonStyles}`}
                >
                  <div className={`w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center mr-4 text-sm ${letterStyles}`}>
                    {letters[idx]}
                  </div>
                  <span className="text-[15px] sm:text-lg font-medium">{option}</span>
                  {isAnswered && isCorrect && (
                    <div className="ml-auto flex-shrink-0 pl-2">
                       <Check className="w-6 h-6 text-emerald-600" />
                    </div>
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <div className="ml-auto flex-shrink-0 pl-2">
                       <X className="w-6 h-6 text-rose-600" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="mt-8 flex justify-between items-center hidden lg:flex flex-shrink-0">
             {!isAnswered ? (
               <p className="italic text-sm text-ink/60">Chọn một đáp án để xem giải thích chi tiết.</p>
             ) : (
                <div />
             )}
            {isAnswered && (
               <button
                 onClick={nextQuestion}
                 className="bg-olive text-white px-8 py-3 rounded font-semibold text-sm hover:opacity-90 uppercase tracking-widest ml-auto transition-opacity flex items-center space-x-2"
               >
                 <span>{currentIndex + 1 === selectedQuestions.length ? 'Xem Kết Quả' : 'Câu tiếp theo'}</span>
                 <ArrowRight className="w-4 h-4" />
               </button>
            )}
          </div>
        </section>

        {/* Right Col: Explanation */}
        <aside className="lg:col-span-4 bg-[#F0EDE4] lg:border-l border-ink-light p-6 sm:p-8 flex flex-col flex-shrink-0 overflow-y-auto">
          {isAnswered ? (
            <div className="bg-white border text-ink border-ink-light p-6 rounded shadow-card mb-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xs font-bold uppercase tracking-widest text-olive mb-4 flex items-center">
                {selectedOption === currentQ.correctAnswer ? (
                  <><Check className="w-4 h-4 mr-2" /> Trả lời đúng</>
                ) : (
                  <><X className="w-4 h-4 mr-2" /> Chưa chính xác</>
                )}
              </h3>
              <p className="text-sm leading-relaxed text-ink/80 mb-4">
                {currentQ.explanation}
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40 py-10 lg:py-0">
               <div className="w-16 h-16 border-2 border-dashed border-ink rounded-full mb-4 flex items-center justify-center opacity-20">
                  <span className="font-serif text-2xl font-bold">?</span>
               </div>
               <p className="text-sm italic">Giải thích sẽ hiện ra sau khi bạn chọn đáp án.</p>
            </div>
          )}

          {/* Ghi chú */}
          <div className="mt-auto hidden lg:block">
            <div className="bg-white/50 p-4 rounded-lg border border-white">
              <h4 className="font-serif text-sm font-bold mb-2">Ghi chú lịch sử</h4>
              <p className="text-[13px] leading-relaxed text-ink/70">
                Trận Cần Giuộc diễn ra đêm rằm tháng 11 năm Tân Dậu (16-12-1861). Các nghĩa sĩ đã tiêu diệt được một số quân Pháp và làm chủ đồn trong một thời gian ngắn.
              </p>
            </div>
          </div>
          
          {/* Mobile next button logic */}
          {isAnswered && (
             <button
               onClick={nextQuestion}
               className="bg-olive text-white px-8 py-3 rounded font-semibold text-sm hover:opacity-90 uppercase tracking-widest mt-6 lg:hidden w-full flex justify-center items-center space-x-2"
             >
               <span>{currentIndex + 1 === selectedQuestions.length ? 'Xem Kết Quả' : 'Câu tiếp theo'}</span>
               <ArrowRight className="w-4 h-4" />
             </button>
          )}
        </aside>
      </main>

      {/* Footer */}
      <footer className="h-12 bg-white border-t border-ink-light flex items-center px-6 sm:px-10 flex-shrink-0 hidden sm:flex">
        <div className="flex items-center gap-4">
          <div className="h-2 w-32 sm:w-48 bg-[#E2DDD3] rounded-full overflow-hidden">
             <div className="h-full bg-olive transition-all duration-500" style={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / selectedQuestions.length) * 100}%` }}></div>
          </div>
          <span className="text-[11px] font-bold text-ink/50 uppercase tracking-widest hidden sm:inline">
            Hoàn thành {Math.round(((currentIndex + (isAnswered ? 1 : 0)) / selectedQuestions.length) * 100)}%
          </span>
        </div>
      </footer>
    </div>
  );
}


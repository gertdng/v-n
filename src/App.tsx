import { useState, useRef } from 'react';
import { Check, X, ArrowRight, RotateCcw, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

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
    explanation: "Giải thích á hả"
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
    explanation: "Lung khởi: cảm tưởng khái quát về người chết.\nThích thực: hồi tưởng công đức của người chết.\nAi vãn: than tiếc người chết.\nKết: nêu lên ý nghĩa và lời mời của người đứng tế đối với linh hồn của người chết."
  },
  {
    question: "Ý nghĩa phần Lung khởi: Hai câu đầu (Súng giặc đất rền / Lòng dân trời tỏ) khẳng định điều gì?",
    options: [
      "Sự thất bại không thể tránh khỏi của nghĩa quân Cần Giuộc.",
      "Khẳng định chính nghĩa sáng ngời của dân ta đối lập với sức mạnh bạo tàn của giặc.",
      "Sự mạnh mẽ của vũ khí quân thù.",
      "Miêu tả khung cảnh thiên nhiên hoang tàn sau trận chiến."
    ],
    correctAnswer: "Khẳng định chính nghĩa sáng ngời của dân ta đối lập với sức mạnh bạo tàn của giặc.",
    explanation: "Súng giặc nố vang trời, tình yêu nước của nhân dân có trời xanh làm chứng."
  },
  {
    question: "Xuất thân: Trước khi cầm súng đánh giặc, những người anh hùng này là ai?",
    options: [
      "Những sĩ phu yêu nước giàu có.",
      "Những người quan lại trong triều đình.",
      "Những người nông dân nghèo khổ, cui cút làm ăn.",
      "Những lính đánh thuê thiện chiến."
    ],
    correctAnswer: "Những người nông dân nghèo khổ, cui cút làm ăn.",
    explanation: "Khẳng định tinh thần đầu tranh."
  },
  {
    question: "Kỹ năng binh nghiệp: Thái độ của họ đối với việc binh đao trước khi giặc đến như thế nào?",
    options: [
      "Chưa có kinh nghiệm chiến đấu, hoàn toàn xa lạ với vũ khí.",
      "Rất tinh thông và luôn sẵn sàng.",
      "Từng được rèn luyện quân sự quy củ từ nhỏ.",
      "Đã có kinh nghiệm sau nhiều trận chiến lớn."
    ],
    correctAnswer: "Chưa có kinh nghiệm chiến đấu, hoàn toàn xa lạ với vũ khí.",
    explanation: "Chỉ biết ruộng trâu, ở trong làng bộ."
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
    explanation: "Dân ta thiếu thốn đủ điều nhưng đấu tranh bằng cả tình yêu đất nước."
  },
  {
    question: "Động lực chiến đấu: Tại sao họ lại tự nguyện đứng lên đánh Pháp?",
    options: [
      "Bị quan lại triều đình bắt ép.",
      "Do lòng yêu nước, căm thù giặc và ý thức trách nhiệm.",
      "Muốn lập công để được ban thưởng.",
      "Không còn nơi nào khác để đi."
    ],
    correctAnswer: "Do lòng yêu nước, căm thù giặc và ý thức trách nhiệm.",
    explanation: "Ý thức trách nhiệm ở đây là mến nghĩa làm quân chiêu mộ."
  },
  {
    question: "Vẻ đẹp hình tượng: Tại sao hình tượng nghĩa sĩ trong bài mang vẻ đẹp bi tráng?",
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
      "Sự vui mừng của người dân khi kẻ thù bại trận và rút lui",
      "Sự giận dữ, trách móc, oán thán triều đình vô dụng không gửi viện binh",
      "Lời khích lệ ý chí , tinh thần người dân tiếp tục chiến đấu "
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
      "Mắt chưa từng ngó, tai chưa từng nghe.",
      "Thà thác mà đặng câu địch khái, về theo tổ phụ cũng vinh.",
      "Bữa thấy bòng bong che trắng lốp.",
      "Sống làm chi theo quân tả đạo, quăng vác đi cho nhọc."
    ],
    correctAnswer: "Thà thác mà đặng câu địch khái, về theo tổ phụ cũng vinh.",
    explanation: "Thà chết mà có tinh thần, ý chí chống kẻ thù, về gặp tổ tiên cũng vinh quang, còn hơn cuộc sống làm nô lệ cho thực dân Pháp."
  },
  {
    question: "Thái độ với kẻ thù: Tác giả dùng những từ ngữ nào để thể hiện sự khinh bỉ quân xâm lược?",
    options: [
      "Mùi tinh chiên, đồ tả đạo, thằng hè.",
      "Quân viễn chinh, khách phương xa.",
      "Thực dân, kẻ thù đáng kính.",
      "Người lính ngoại quốc."
    ],
    correctAnswer: "Mùi tinh chiên, đồ tả đạo, thằng hè.",
    explanation: "Mùi tinh chiên: chỉ mùi hôi tanh nồng nặc.\nTả đạo: có nghĩa là tà đạo, đạo sai trái, không chính thống.\n=> Ý chỉ miệt thị, thù ghét quân Pháp."
  },
  {
    question: "Giá trị lịch sử văn học: Bài văn này được coi là tượng đài gì trong văn học Việt Nam?",
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
  
  const [playerName, setPlayerName] = useState('');
  const [showBadge, setShowBadge] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);

  const downloadBadge = async () => {
    if (!badgeRef.current) return;
    try {
      const canvas = await html2canvas(badgeRef.current, {
        scale: 2,
        backgroundColor: '#FDFBF7',
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Danh_Hieu_Can_Giuoc_${playerName.replace(/\s+/g, '_')}.png`;
      link.click();
    } catch (error) {
      console.error('Error generating image', error);
    }
  };

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
    setPlayerName('');
    setShowBadge(false);
    setGameState('PLAYING');
  };

  const handleSelect = (option: string) => {
    if (selectedOption) return; // Prevent double clicking
    setSelectedOption(option);
    if (option.trim() === (selectedQuestions[currentIndex].correctAnswer || "").trim()) {
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
      <div className="h-screen flex flex-col items-center justify-center p-6 font-sans text-ink relative">
        <div className="max-w-xl w-full classic-card p-10 text-center m-2 shadow-woodblock relative z-10">
          <div className="flex justify-center mb-6 text-crimson space-x-2">
            <span className="text-2xl opacity-80">❖</span>
          </div>
          <h1 className="font-serif text-3xl font-bold mb-4 text-ink">Văn tế Nghĩa sĩ Cần Giuộc</h1>
          <p className="font-serif text-sm tracking-widest opacity-70 uppercase mb-8">Nguyễn Đình Chiểu • 1861</p>
          <div className="w-16 h-[1px] bg-ink/20 mx-auto mb-8"></div>
          <p className="text-ink/80 mb-10 leading-relaxed font-medium">
            Trò chơi trắc nghiệm gồm 8 câu hỏi tìm hiểu về tác phẩm văn học mang đậm triết lý bi tráng của nhân dân Nam Bộ.
          </p>
          <button
            onClick={startGame}
            className="w-full sm:w-auto bg-ink text-paper font-semibold py-3 px-10 border border-ink hover:bg-ink/90 shadow-[2px_2px_0_0_#8C2111] uppercase tracking-widest transition-all"
          >
            Bắt Đầu Chơi
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'RESULT') {
    const wrongCount = selectedQuestions.length - score;
    const getTitle = (s: number) => {
      if (s === 8) return "Đại Tướng Cần Giuộc";
      if (s >= 6) return "Nghĩa Sĩ Uy Dũng";
      if (s >= 4) return "Dân Binh Quả Cảm";
      return "Tân Binh Tập Sự";
    };

    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 font-sans text-ink relative overflow-y-auto w-full">
        <div className="max-w-xl w-full classic-card p-6 lg:p-10 text-center m-2 shadow-woodblock relative z-10 flex flex-col items-center my-auto">
          {!showBadge ? (
            <>
              <div className="flex justify-center mb-6 text-crimson space-x-2">
                <span className="text-2xl opacity-80">❖</span>
              </div>
              <h2 className="font-serif text-3xl font-bold mb-8 text-ink">Kết Quả Binh Tình</h2>
              
              <div className="flex justify-center flex-wrap gap-4 sm:gap-8 mb-8 w-full">
                 <div className="border-[1.5px] border-ink bg-[#FDFBF7] rounded-sm p-6 flex-1 min-w-[120px] shadow-[3px_3px_0_0_#2B593F]">
                  <div className="font-serif text-[10px] uppercase opacity-80 text-moss font-bold mb-2 tracking-widest">Đúng</div>
                  <div className="font-serif text-4xl font-bold text-ink">{score}</div>
                </div>
                <div className="border-[1.5px] border-ink bg-[#FDFBF7] rounded-sm p-6 flex-1 min-w-[120px] shadow-[3px_3px_0_0_#8C2111]">
                  <div className="font-serif text-[10px] uppercase opacity-80 text-crimson font-bold mb-2 tracking-widest">Sai</div>
                  <div className="font-serif text-4xl font-bold text-ink">{wrongCount}</div>
                </div>
              </div>
              
              <div className="w-full mb-8 bg-[#F0EDE4] p-6 border-[1.5px] border-ink shadow-[2px_2px_0_0_#3D3935] rounded-sm">
                <p className="text-sm font-bold mb-4 uppercase tracking-widest text-ink/80 flex items-center justify-center font-serif">
                   <span className="opacity-50 mr-2">~</span> Lưu danh sử sách <span className="opacity-50 ml-2">~</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Nhập tên của bạn..."
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="flex-1 bg-white border-2 border-ink px-4 py-3 rounded-sm font-serif focus:outline-none focus:border-moss transition-colors text-center sm:text-left"
                  />
                  <button
                    onClick={() => playerName.trim() && setShowBadge(true)}
                    disabled={!playerName.trim()}
                    className="bg-moss text-paper font-semibold py-3 px-6 border border-ink hover:bg-moss/90 shadow-[2px_2px_0_0_#2B593F] transition-all uppercase tracking-widest text-sm disabled:opacity-50 disabled:shadow-none whitespace-nowrap disabled:cursor-not-allowed"
                  >
                    Tạo Danh Hiệu
                  </button>
                </div>
              </div>

              <button
                onClick={startGame}
                className="flex items-center justify-center space-x-2 w-full sm:w-auto mx-auto bg-ink text-paper font-semibold py-3 px-8 border border-ink hover:bg-ink/90 shadow-[2px_2px_0_0_#8C2111] transition-all uppercase tracking-widest text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Chơi Lại Trận Mới</span>
              </button>
            </>
          ) : (
            <div className="w-full flex justify-center items-center flex-col animate-in zoom-in-95 duration-500">
              <div ref={badgeRef} className="w-full border-[6px] border-double border-ink bg-[#FDFBF7] p-8 sm:p-12 text-center mb-8 relative shadow-[4px_4px_0_0_#8C2111]">
                 <div className="absolute top-4 left-4 text-3xl opacity-20 hidden sm:block">❖</div>
                 <div className="absolute top-4 right-4 text-3xl opacity-20 hidden sm:block">❖</div>
                 <div className="absolute bottom-4 left-4 text-3xl opacity-20 hidden sm:block">❖</div>
                 <div className="absolute bottom-4 right-4 text-3xl opacity-20 hidden sm:block">❖</div>
                 
                 <div className="mb-4 flex justify-center">
                    <span className="text-[2.5rem] text-crimson opacity-80 leading-none">印</span>
                 </div>
                 
                 <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-[0.2em] mb-8 text-ink">
                   Bằng Khen
                 </h3>
                 
                 <p className="font-serif text-ink opacity-70 italic mb-2 text-sm sm:text-base">Trân trọng cáo thị cho bá tánh biết:</p>
                 <h4 className="font-serif text-3xl sm:text-4xl text-moss font-bold mb-6 break-words px-2">{playerName}</h4>
                 
                 <div className="w-24 h-[1.5px] bg-ink opacity-20 mx-auto mb-6"></div>
                 
                 <p className="font-serif text-sm sm:text-base leading-relaxed mb-8 text-ink opacity-90">
                   Đã thành công vượt qua tiểu khảo về tác phẩm<br/>
                   <strong className="font-bold text-base sm:text-lg mt-2 inline-block">Văn tế Nghĩa sĩ Cần Giuộc</strong>
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                   <div className="border border-ink p-4 min-w-[140px] bg-white w-full sm:w-auto shadow-[2px_2px_0_0_#3D3935]">
                     <p className="font-serif text-[10px] uppercase font-bold tracking-widest opacity-60 mb-2">Thành Tích</p>
                     <p className="font-serif text-2xl font-bold text-ink">{score} / {selectedQuestions.length}</p>
                   </div>
                   <div className="border border-ink p-4 min-w-[140px] bg-white w-full sm:w-auto shadow-[2px_2px_0_0_#3D3935]">
                     <p className="font-serif text-[10px] uppercase font-bold tracking-widest opacity-60 mb-2">Phong Cấp</p>
                     <p className="font-serif text-lg font-bold text-crimson pt-[2px]">{getTitle(score)}</p>
                   </div>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button
                  onClick={downloadBadge}
                  className="flex-1 flex items-center justify-center space-x-2 bg-moss text-paper font-semibold py-3 px-6 border border-ink hover:bg-moss/90 shadow-[2px_2px_0_0_#2B593F] transition-all uppercase tracking-widest text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải Ảnh Bằng Khen</span>
                </button>
                <button
                  onClick={startGame}
                  className="flex-1 flex items-center justify-center space-x-2 bg-white text-ink font-semibold py-3 px-6 border border-ink hover:bg-black/5 shadow-[2px_2px_0_0_#8C2111] transition-all uppercase tracking-widest text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Thử Thách Lại</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const currentQ = selectedQuestions[currentIndex];
  const isAnswered = selectedOption !== null;
  const answeredCount = isAnswered ? currentIndex + 1 : currentIndex;
  const currentWrongCount = answeredCount - score;

  return (
    <div className="h-screen w-full flex flex-col font-sans text-ink relative">
      {/* Header */}
      <header className="h-20 bg-ink text-paper border-b-[4px] border-crimson flex items-center justify-between px-6 sm:px-10 flex-shrink-0 z-10">
        <div>
          <h1 className="font-serif text-lg sm:text-2xl text-paper">Văn tế Nghĩa sĩ Cần Giuộc</h1>
          <p className="font-serif text-[10px] sm:text-xs tracking-widest opacity-70 uppercase mt-1">Nguyễn Đình Chiểu • 1861</p>
        </div>
        <div className="flex gap-4 sm:gap-8 items-center">
          <div className="text-right hidden sm:block mt-1">
            <p className="text-[10px] uppercase opacity-60 font-medium">Tiến độ</p>
            <p className="font-semibold text-sm font-serif">Câu {currentIndex + 1} / {selectedQuestions.length}</p>
          </div>
          <div className="w-[1px] h-8 bg-paper/20 hidden sm:block"></div>
          <div className="flex gap-4 mt-1">
            <div className="text-center">
              <p className="font-serif text-[10px] uppercase opacity-80 text-[#A3B18A] font-bold tracking-widest">Đúng</p>
              <p className="font-bold text-sm tracking-widest font-serif">{score.toString().padStart(2, '0')}</p>
            </div>
            <div className="text-center text-[#E07A5F]">
              <p className="font-serif text-[10px] uppercase opacity-80 text-[#E07A5F] font-bold tracking-widest">Sai</p>
              <p className="font-bold text-sm tracking-widest font-serif">{currentWrongCount.toString().padStart(2, '0')}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col lg:grid lg:grid-cols-12 overflow-hidden h-full z-0 relative">
        {/* Left Col: Question and Options */}
        <section className="lg:col-span-8 p-6 sm:p-10 flex flex-col overflow-y-auto">
          <div className="mb-8 flex-shrink-0">
            <span className="font-serif text-[11px] font-bold uppercase tracking-widest text-paper bg-ink px-3 py-1 rounded-sm shadow-woodblock">
              Câu hỏi {currentIndex + 1}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mt-8 leading-snug">
              {currentQ.question}
            </h2>
          </div>

          <div className="grid gap-4 mt-auto lg:mt-0 pb-4">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption?.trim() === option.trim();
              const isCorrect = option.trim() === currentQ.correctAnswer.trim();
              
              let buttonStyles = "border border-ink-light bg-[#FDFBF7] hover:border-ink hover:bg-ink/5 text-ink/80 rounded-sm";
              let letterStyles = "border-2 border-crimson/30 text-crimson/50 font-serif font-bold rounded-sm";

              if (isAnswered) {
                if (isCorrect) {
                  buttonStyles = "border-2 border-moss bg-moss/5 text-ink rounded-sm shadow-[2px_2px_0_0_#2B593F]";
                  letterStyles = "border-2 border-moss text-moss font-serif font-bold rounded-sm";
                } else if (isSelected) {
                  buttonStyles = "border-2 border-crimson bg-crimson/5 text-ink rounded-sm shadow-[2px_2px_0_0_#8C2111]";
                  letterStyles = "border-2 border-crimson text-crimson font-serif font-bold rounded-sm";
                } else {
                  buttonStyles = "border border-ink-light opacity-60 bg-transparent text-ink/50 rounded-sm";
                  letterStyles = "border-2 border-ink-light text-ink/30 font-serif font-bold rounded-sm";
                }
              } else if (isSelected) {
                 buttonStyles = "border-2 border-ink bg-ink/5 text-ink outline outline-1 outline-offset-2 outline-ink/20 rounded-sm";
                 letterStyles = "border-2 border-ink text-ink font-serif font-bold rounded-sm";
              }

              const letters = ['A', 'B', 'C', 'D'];

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(option)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 sm:p-5 flex items-center transition-all ${buttonStyles}`}
                >
                  <div className={`w-8 h-8 flex flex-shrink-0 items-center justify-center mr-4 text-sm bg-transparent ${letterStyles}`}>
                    {letters[idx]}
                  </div>
                  <span className="text-[15px] sm:text-lg font-medium">{option}</span>
                  {isAnswered && isCorrect && (
                    <div className="ml-auto flex-shrink-0 pl-2">
                       <Check className="w-6 h-6 text-moss" />
                    </div>
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <div className="ml-auto flex-shrink-0 pl-2">
                       <X className="w-6 h-6 text-crimson" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="mt-8 flex justify-between items-center hidden lg:flex flex-shrink-0">
             {!isAnswered ? (
               <p className="italic text-sm text-ink/60 font-serif">Chọn một đáp án để xem giải thích chi tiết.</p>
             ) : (
                <div />
             )}
            {isAnswered && (
               <button
                 onClick={nextQuestion}
                 className="bg-ink text-paper border border-ink hover:bg-ink/90 px-8 py-3 rounded-sm font-bold text-sm uppercase tracking-widest shadow-[2px_2px_0_0_#8C2111] ml-auto transition-all flex items-center space-x-2"
               >
                 <span>{currentIndex + 1 === selectedQuestions.length ? 'Xem Kết Quả' : 'Câu tiếp theo'}</span>
                 <ArrowRight className="w-4 h-4" />
               </button>
            )}
          </div>
        </section>

        {/* Right Col: Explanation */}
        <aside className={`lg:col-span-4 bg-[#F0EDE4] lg:border-l-[1.5px] border-ink p-4 lg:p-8 flex-col flex-shrink-0 overflow-y-auto ${!isAnswered ? 'hidden lg:flex' : 'flex'}`}>
          {isAnswered ? (
            <div className="bg-[#FDFBF7] border-[1.5px] text-ink border-ink p-4 lg:p-6 rounded-sm shadow-woodblock mb-4 lg:mb-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className={`font-serif text-[10px] lg:text-xs font-bold uppercase tracking-widest mb-2 lg:mb-4 flex items-center ${selectedOption?.trim() === currentQ.correctAnswer?.trim() ? 'text-moss' : 'text-crimson'}`}>
                {selectedOption?.trim() === currentQ.correctAnswer?.trim() ? (
                  <><Check className="w-3.5 h-3.5 lg:w-4 lg:h-4 mr-1.5 lg:mr-2" /> Trả lời đúng</>
                ) : (
                  <><X className="w-3.5 h-3.5 lg:w-4 lg:h-4 mr-1.5 lg:mr-2" /> Chưa chính xác</>
                )}
              </h3>
              <p className="text-[13px] lg:text-sm leading-relaxed text-ink/90 font-medium whitespace-pre-line">
                {currentQ.explanation}
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40 py-10 lg:py-0">
               <div className="w-16 h-16 border-2 border-dashed border-ink rounded-full mb-4 flex items-center justify-center opacity-30">
                  <span className="font-serif text-3xl font-bold">印</span>
               </div>
               <p className="text-sm italic font-serif">Giải thích sẽ hiện ra sau khi chọn đáp án.</p>
            </div>
          )}

          {/* Ghi chú */}
          <div className="mt-auto hidden lg:block">
            <div className="bg-[#E6E1D6] p-5 rounded-sm border border-ink shadow-[2px_2px_0_0_#3D3935]">
              <h4 className="font-serif text-sm font-bold mb-2">Ghi chú lịch sử</h4>
              <p className="text-[13px] leading-relaxed text-ink/80 font-medium">
                Trận Cần Giuộc diễn ra đêm rằm tháng 11 năm Tân Dậu (16-12-1861). Các nghĩa sĩ đã tiêu diệt được một số quân Pháp và làm chủ đồn trong một thời gian ngắn.
              </p>
            </div>
          </div>
          
          {/* Mobile next button logic */}
          {isAnswered && (
             <button
               onClick={nextQuestion}
               className="bg-ink text-paper border border-ink hover:bg-ink/90 px-6 py-3 rounded-sm font-bold text-sm uppercase tracking-widest shadow-[2px_2px_0_0_#8C2111] mt-6 lg:hidden w-full flex justify-center items-center space-x-2 transition-all"
             >
               <span>{currentIndex + 1 === selectedQuestions.length ? 'Xem Kết Quả' : 'Câu tiếp theo'}</span>
               <ArrowRight className="w-4 h-4" />
             </button>
          )}
        </aside>
      </main>

      {/* Footer */}
      <footer className="h-12 border-t-[1.5px] bg-[#FDFBF7] border-ink flex items-center px-6 sm:px-10 flex-shrink-0 hidden sm:flex z-10 relative">
        <div className="flex items-center gap-4">
          <div className="h-1.5 w-32 sm:w-48 bg-ink/10 rounded-sm overflow-hidden outline outline-1 outline-ink/20">
             <div className="h-full bg-crimson transition-all duration-500" style={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / selectedQuestions.length) * 100}%` }}></div>
          </div>
          <span className="font-serif text-[10px] font-bold text-ink/60 uppercase tracking-widest hidden sm:inline">
            Hoàn thành {Math.round(((currentIndex + (isAnswered ? 1 : 0)) / selectedQuestions.length) * 100)}%
          </span>
        </div>
      </footer>
    </div>
  );
}


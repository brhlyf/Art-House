import adultSketchImg from '../assets/images/gallery_adult_sketch_1787057374298.jpg';
import adultOilImg from '../assets/images/course_adult_art_1787057318060.jpg';
import kidsMushroomImg from '../assets/images/gallery_kids_mushroom_1787057390683.jpg';
import kidsSockImg from '../assets/images/gallery_kids_sock_1787057407425.jpg';
import kidsArtClassImg from '../assets/images/course_kids_art_1787057335416.jpg';
import onlineStudentArtImg from '../assets/images/online_student_art_1787058856704.jpg';
import craftOceanImg from '../assets/images/gallery_craft_ocean_1787057421276.jpg';
import craftClownImg from '../assets/images/gallery_craft_clown_1787057437546.jpg';
import craftClayImg from '../assets/images/course_kids_clay_1787057356208.jpg';
import realSceneKidsSketch from '../assets/images/real_scene_kids_sketch_1787058140262.jpg';
import realSceneTeacherClay from '../assets/images/real_scene_teacher_clay_1787058159470.jpg';
import onlineClassSceneImg from '../assets/images/online_class_scene_1787058868605.jpg';
import atelierBannerImg from '../assets/images/atelier_cover_banner_1787056690009.jpg';

export interface GallerySlide {
  url: string;
  caption: {
    ja: string;
    zh: string;
  };
}

export interface ArtworkDetail {
  id: string;
  category: 'adult' | 'kids-art' | 'craft' | 'scene';
  title: {
    ja: string;
    zh: string;
  };
  subtitle: {
    ja: string;
    zh: string;
  };
  studentName: {
    ja: string;
    zh: string;
  };
  ageOrBio: {
    ja: string;
    zh: string;
  };
  medium: {
    ja: string;
    zh: string;
  };
  completionTime: {
    ja: string;
    zh: string;
  };
  image: string;
  images: GallerySlide[];
  accentColor: string;
  studentComment: {
    ja: string;
    zh: string;
  };
  teacherFeedback: {
    ja: string;
    zh: string;
  };
  tags: {
    ja: string[];
    zh: string[];
  };
  likes: number;
}

export const galleryData: ArtworkDetail[] = [
  // 1. 成人美术作品
  {
    id: 'gallery-adult',
    category: 'adult',
    title: {
      ja: '大人向け絵画・素描＆油彩作品集',
      zh: '成人美术作品（素描·插画·油画研习）',
    },
    subtitle: {
      ja: '線の重なりと陰影が織りなす、深い静寂と表現力',
      zh: '细腻点线与层次阴影，抒发内心的宁静与艺术质感',
    },
    studentName: {
      ja: '大人の生徒様作品 / 週末アート研習クラス',
      zh: '成人研习班学员作品 / 周末美学工坊',
    },
    ageOrBio: {
      ja: '社会人・主婦・趣味のデッサンクラス受講',
      zh: '零基础白领 / 艺术爱好者 / 进阶学员',
    },
    medium: {
      ja: '微細インクペン画、クラシック油彩、キャンバス (F6~F8)',
      zh: '极细针管笔排线、经典油彩、专业亚麻画布 (F6~F8)',
    },
    completionTime: {
      ja: '個別指導（各2〜4レッスン）',
      zh: '专属指导 (各2~4次课程循序渐进)',
    },
    image: adultSketchImg,
    images: [
      {
        url: adultSketchImg,
        caption: {
          ja: '繊細なクロスハッチングで描く人物ポートレート素描',
          zh: '极细针管笔点线交叉排线《复古针织帽少女人物肖像》',
        },
      },
      {
        url: adultOilImg,
        caption: {
          ja: 'イーゼルに広がる古典油彩画・色調と質感の研究',
          zh: '画架写生油画《日光画室里的经典色彩与光影研习》',
        },
      },
      {
        url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1000&auto=format&fit=crop',
        caption: {
          ja: '現代アクリル・花卉と静物の色彩表現',
          zh: '现代丙烯与水彩《静物花卉与温馨空间质感》',
        },
      },
    ],
    accentColor: '#9333EA',
    studentComment: {
      ja: '「仕事帰りに通い始め、絵を描く時間だけは日常の忙しさを忘れて没頭できます。先生がペンの角度や陰影のつけ方を丁寧に教えてくださり、自分でも驚くほど深みのある絵が描けました。」',
      zh: '“平时工作节奏很快，但每次坐进画室拿起画笔，整个人都沉静了下来。老师一步步指导线条层次和排线韵律，零基础也能画出充满细节的满意作品！”',
    },
    teacherFeedback: {
      ja: 'ペンの筆圧コントロールと密度の変化が非常に美しく、帽子のテクスチャや瞳の繊細な表情に大人ならではの洗練された感性が現れています。',
      zh: '线条密度分布均匀且极具结构张力，帽子纹理与面部阴影的细腻转折处理得恰到好处，展现了优雅深沉的造型功底与专注力。',
    },
    tags: {
      ja: ['ペン画', '人物素描', '油彩画', '大人美育'],
      zh: ['针管笔排线', '人物肖像', '写生油画', '成人美育'],
    },
    likes: 328,
  },

  // 2. 儿童创意画
  {
    id: 'gallery-kids-art',
    category: 'kids-art',
    title: {
      ja: '少児創作絵画（キノコの森とファンタジーイラスト）',
      zh: '儿童创意画（少儿创想美育画作）',
    },
    subtitle: {
      ja: '自由な発想と鮮やかな色彩が広がる子どもの世界',
      zh: '放飞童趣想象力，用斑斓色彩描摹心中的奇幻天地',
    },
    studentName: {
      ja: '少児創作クラス受講生（4〜10歳）',
      zh: '少儿创意美术班学员（4~10岁）',
    },
    ageOrBio: {
      ja: '子どもの感性を育む創作美育コース',
      zh: '美育启蒙与多介质创想绘画班',
    },
    medium: {
      ja: '専門用水彩、カラーマーカー、特殊画用紙、コラージュ',
      zh: '儿童专业水彩、油画棒、马克笔、拼贴综合媒介 (8K)',
    },
    completionTime: {
      ja: '1〜2レッスン（60〜90分/回）',
      zh: '1~2次课程 (60~90分钟/次)',
    },
    image: kidsMushroomImg,
    images: [
      {
        url: kidsMushroomImg,
        caption: {
          ja: '『カラフルなキノコの森と小さな冒険』誇らしげな笑顔の完成記念',
          zh: '《童梦蘑菇森林与雨滴秘密》小朋友开心地展示自己的画作',
        },
      },
      {
        url: onlineStudentArtImg,
        caption: {
          ja: '『オンライン生配信クラス』画面越しに描きたての作品を笑顔で披露する生徒様',
          zh: '《网络直播课学员连线》小朋友在电脑屏幕前开心地向老师展示画作',
        },
      },
      {
        url: kidsSockImg,
        caption: {
          ja: '『ポップなスニーカーソックスとモンスターたち』自由なアイデア満載',
          zh: '《趣味怪兽涂鸦潮袜构想》充满天马行空的趣味色彩与表情',
        },
      },
      {
        url: kidsArtClassImg,
        caption: {
          ja: '『みんなで描くアトリエの午後』仲間と一緒に色彩を楽しむ時間',
          zh: '《画室里的快乐创想时光》小朋友们沉浸在色彩与线条的海洋',
        },
      },
    ],
    accentColor: '#E84A27',
    studentComment: {
      ja: '「キノコのおうちに小さなお友達が住んでいる絵を描きました！赤と黄色とみどりをたくさん使って、大好きな雨の日のキラキラも描けて嬉しかったです！」',
      zh: '“我画了超大的彩色波点蘑菇城堡，还给小袜子画上了各种搞怪的小怪兽！老师鼓励我大胆用颜色，画画成了我每周最期待的事情！”',
    },
    teacherFeedback: {
      ja: '子どもの内側から溢れ出るストーリー性と自由な構図が素晴らしいです。色と形の組み合わせに枠にとらわれない柔軟な感性が宿っています。',
      zh: '色彩纯度高、对比强烈，且充满了孩子独特的叙事感。每一个图形细节都是孩子观察世界与内心情感的真实映射，极富感染力。',
    },
    tags: {
      ja: ['少児絵画', '水彩画', 'ポップアート', '発想力'],
      zh: ['少儿创意画', '水彩插画', '怪兽涂鸦', '色彩启蒙'],
    },
    likes: 412,
  },

  // 3. 儿童手工作品（立体造型与粘土）
  {
    id: 'gallery-craft',
    category: 'craft',
    title: {
      ja: '立体粘土＆手芸クラフト作品集',
      zh: '手工作品（立体造型与超轻粘土工坊）',
    },
    subtitle: {
      ja: '指先から生まれる3Dの世界・海の世界と立体バッジ',
      zh: '指尖揉捏出的奇幻立体世界，海洋浮雕与趣味手作徽章',
    },
    studentName: {
      ja: '立体クラフト・粘土工坊受講生（5〜12歳）',
      zh: '儿童手工·粘土立体造型班学员（5~12岁）',
    },
    ageOrBio: {
      ja: '立体造形・手先の器用さと空間認知を伸ばすコース',
      zh: '动手能力、空间立体感知与手脑协调培养',
    },
    medium: {
      ja: '安心・無毒超軽量樹脂粘土、木製フレーム、安全パーツ',
      zh: '环保超轻彩色粘土、木质浮雕画框、安全胸针配件',
    },
    completionTime: {
      ja: '1レッスン（90分で持ち帰り可能）',
      zh: '单次课程 90分钟（下课即可带走成品）',
    },
    image: craftOceanImg,
    images: [
      {
        url: craftOceanImg,
        caption: {
          ja: '3D立体粘土レリーフ『創る楽しさ・カラフルな海の世界』',
          zh: '3D超轻粘土浮雕板《奇幻海底世界·珊瑚与小丑鱼探险》',
        },
      },
      {
        url: craftClownImg,
        caption: {
          ja: '立体クラフトバッジ『にこにこピエロの手作りブローチ』',
          zh: '立体手工徽章《笑脸小丑趣味胸针·小朋友自豪展示》',
        },
      },
      {
        url: craftClayImg,
        caption: {
          ja: '『カラフル粘土のスイーツ＆マスコット工房』指先で形作る楽しさ',
          zh: '《手工工坊微缩造型与小萌物制作》手部精细肌肉力量锻炼',
        },
      },
    ],
    accentColor: '#3B82F6',
    studentComment: {
      ja: '「粘土をこねて新しい色を作ったり、サンゴに穴を開けたりするのがすごく楽しかったです！持ち帰ってお部屋に飾ったら家族みんながびっくりしていました！」',
      zh: '“自己调配出渐变海浪和粉色水母特别好玩！做好的海底世界浮雕画直接挂在家里玄关，爸爸妈妈都夸我像个小雕塑家！”',
    },
    teacherFeedback: {
      ja: '立体の高低差やテクスチャの表現に工夫が見られ、指先の集中力と造形感覚が急速に成長しています。完成時の誇らしげな笑顔が何よりの宝物です。',
      zh: '通过揉、捏、搓、压等立体技法，孩子们在玩耍中掌握了复杂的空间结构与色彩层叠关系，不仅培养了专注力，更带来了极大的创造自信。',
    },
    tags: {
      ja: ['軽量粘土', '3D立体レリーフ', '海の世界', '空間認知'],
      zh: ['超轻粘土', '3D海洋浮雕', '手工徽章', '立体美育'],
    },
    likes: 389,
  },

  // 4. 教室实景
  {
    id: 'gallery-scene',
    category: 'scene',
    title: {
      ja: 'アトリエ教室実景＆レッスンの温かな日常',
      zh: '教室实景（小班私享·专注教学与温馨互动）',
    },
    subtitle: {
      ja: '自然光あふれる木質空間、一人ひとりに寄り添う丁寧な時間',
      zh: '通透自然采光与温润实木客厅，双语细致指导的真实画室时光',
    },
    studentName: {
      ja: 'Art House 名古屋天白アトリエの風景',
      zh: 'Art House 名古屋天白画室日常记录',
    },
    ageOrBio: {
      ja: '少人数制（1クラス4〜6名）・無料駐車場2台完備',
      zh: '4~6人小班教学 / 中文为主·日语辅助 / 配备车位',
    },
    medium: {
      ja: '高級木製テーブル、イーゼル、お茶・珈琲サービス、画材全完備',
      zh: '原木教学长桌、专业画架、茶歇咖啡、进口专业画材全包',
    },
    completionTime: {
      ja: '平日・週末 定期開講中',
      zh: '平日与周末常年开放体验预约',
    },
    image: realSceneTeacherClay,
    images: [
      {
        url: realSceneTeacherClay,
        caption: {
          ja: '『手を取り合う立体粘土指導』董先生が生徒一人ひとりに寄り添う丁寧なワークショップ',
          zh: '《董老师手把手指导立体粘土造型》老师细心示范与学员专注创作的真实教学现场',
        },
      },
      {
        url: onlineClassSceneImg,
        caption: {
          ja: '『オンライン生中継レッスンの配信風景』高画質カメラとデュアルモニターで双方向リアルタイム指導',
          zh: '《网络直播课教学实景》多机位高清俯拍与屏幕实时互动，老师一对一连线悉心点评',
        },
      },
      {
        url: realSceneKidsSketch,
        caption: {
          ja: '『真剣な眼差しで描くデッサン風景』小人数で原木テーブルを囲む静かな創作時間',
          zh: '《学员围坐原木长桌专注作画》小班私享·安静专注的少儿创作时光',
        },
      },
      {
        url: atelierBannerImg,
        caption: {
          ja: '『自然光あふれるアトリエ空間』木製イーゼルと画材が揃う温かな環境',
          zh: '《充满自然采光的画室环境》配备专属榉木画架与整洁全套画具',
        },
      },
    ],
    accentColor: '#10B981',
    studentComment: {
      ja: '「大手の大人数教室と違って、とてもアットホームで落ち着いて質問できます。先生が中国語と日本語の両方で丁寧に教えてくれるので安心です。」',
      zh: '“画室环境非常温馨整洁，采光很好。4~6人的小班制让老师可以时刻关注到每个人的进度，不懂的地方用中文随时能沟通透彻，氛围非常轻松。”',
    },
    teacherFeedback: {
      ja: '少人数だからこそ、一人ひとりの個性と歩幅に合わせて丁寧に向き合えるのがArt Houseの誇りです。絵を描く楽しさを空間全体で届けています。',
      zh: '我们坚持小班制精细辅导，不仅传授专业技法，更营造一个充满鼓励与温暖的艺术空间，让每位来到这里的孩子与成人都能享受纯粹的作画喜悦。',
    },
    tags: {
      ja: ['教室風景', '小人数制', 'バイリンガル', '天白区'],
      zh: ['画室实景', '精致小班', '双语教学', '天白区植田西'],
    },
    likes: 476,
  },
];

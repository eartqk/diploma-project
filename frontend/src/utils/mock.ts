import { User } from "../types/common";

export const mockUser: User = {
  id: 1,
  avatar:
    "https://images.unsplash.com/photo-1607988795691-3d0147b43231?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=255&q=80",
  name: "Альберт",
  surname: "Эйнштейн",
  email: "a.einstein@sciencelink.com",
  about:
    "Я Альберт Эйнштейн, выдающийся физик и математик. Родился 14 марта 1879 года в Ульме, Германия. Моя теория относительности перевернула наше понимание Вселенной. Страстно увлечен научным исследованием, я считал любопытство и воображение ключевыми для прогресса. Награжден Нобелевской премией по физике в 1921 году, я использовал свои знания для блага человечества, подчеркивая значение образования и интеллектуальной свободы. Надеюсь, вдохновить будущие поколения и проложить путь к расширению границ человеческого познания.",
  birthday: "March 14, 1879",
  country: "Germany",
  followerCount: 74234,
  created_at: "March 10, 2023",
};

export const mockUser2: User = {
  id: 2,
  avatar:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Tesla_circa_1890.jpeg/274px-Tesla_circa_1890.jpeg",
  name: "Никола",
  surname: "Тесла",
  email: "n.tesla@sciencelink.com",
  about:
    "Я Никола Тесла, выдающийся изобретатель и электроинженер. Родился 10 июля 1856 года в Смилане, Хорватия. Мои открытия и изобретения в области электротехники и беспроводной передачи энергии сыграли революционную роль в прогрессе человечества. Я разработал систему переменного тока, которая стала основой современной электроэнергетики. Моя работа в области радио и радиолокации также имеет огромное значение. Я стремился использовать технологии для улучшения жизни людей и создания более эффективных источников энергии. Моя приверженность науке и инновациям оставила неизгладимый след в истории и вдохновляет будущие поколения.",
  birthday: "July 10, 1856",
  country: "Croatia",
  followerCount: 98234,
  created_at: "March 9, 2023",
};

export const mockPost = {
  id: 1,
  body: `🔬🌍 Exploring the Wonders of Our Universe! 🚀🌌

  🌟✨ Did you know that the universe is a vast playground of fascinating phenomena waiting to be discovered? Let's embark on a journey together as we delve into the captivating realm of science! 🧪🔭
  
  🔍 Today, let's marvel at the mind-boggling concept of black holes. 🌌 These cosmic beasts are formed when massive stars collapse under their own gravity, creating an intense gravitational pull from which nothing, not even light, can escape. Imagine a place where the laws of physics as we know them cease to exist!
  
  💡 Recent studies suggest that black holes might not be the eternal prisons we once believed them to be. Thanks to mind-blowing discoveries in quantum physics, scientists are unraveling the mysteries surrounding black holes and their event horizons. The possibility of information leaking out from black holes challenges our understanding of the universe and opens up new avenues for scientific exploration. 🕳️📚
  
  🌈 Moreover, have you ever wondered about the origins of the universe itself? The Big Bang theory provides a captivating explanation for how our universe came into existence. It proposes that approximately 13.8 billion years ago, all matter and energy were condensed into an infinitesimally small and incredibly dense point called a singularity. Suddenly, in an immense burst of energy, the universe expanded and continues to expand to this day! 🌌💥
  
  🔬 In the realm of biology, let's not forget the awe-inspiring world of genetics and DNA! The blueprint of life itself, DNA holds the secrets to our very existence. Recent breakthroughs in gene editing technologies, such as CRISPR-Cas9, are revolutionizing the field of medicine and offering hope for curing genetic diseases. The possibilities are boundless, and we are witnessing a transformative era in healthcare! 🧬💉
  
  ✨ Join us on this exhilarating scientific journey where we explore the cosmos, decipher the mysteries of life, and uncover the limitless potential of human knowledge. Together, we can marvel at the wonders of our universe and celebrate the triumphs of scientific discovery! 🌍🔭
  
  🚀 Stay curious, stay inspired, and let science guide us toward a brighter future! 🌟💡
  
  #ScienceExploration #CosmicWonders #UnravelingMysteries #ScientificBreakthroughs`,
  user: mockUser,
  likes: 11,
  updated_at: "10:00 March 10, 2023",
  created_at: "10:00 March 10, 2023",
};

export const mockPost2 = {
  id: 2,
  body: `
  🌿🌞 The Magic of Photosynthesis: Life's Green Miracle! 🍃🌍
  
  🌱 Did you know plants are nature's superheroes? Through photosynthesis, they convert sunlight, water, and carbon dioxide into oxygen and energy-rich glucose. This incredible process fuels life on Earth and helps regulate our climate. Let's celebrate the wonders of photosynthesis and cherish our green allies! 🌿🌞
  
  #PhotosynthesisMarvels #GreenMiracle #LifeSustainers`,
  user: mockUser,
  likes: 9,
  updated_at: "10:00 March 11, 2023",
  created_at: "10:00 March 11, 2023",
};

export const mockPost3 = {
  id: 3,
  body: `
  ⚡️ Никола Тесла: Раскрываем Волшебство Электричества! 💡

  Приветствую, друзья! Давайте вместе исследуем силу электричества. С помощью переменного тока я перевернул мир, соединив нации и осветив дома. Представьте будущее с беспроводной передачей энергии, где электричество свободно течет. Электричество открывает двери к расшифровке природных тайн и преобразованию нашей жизни!
  
  #НиколаТесла #ЭлектрическаяРеволюция #РаскрываемСилу`,
  user: mockUser2,
  likes: 123,
  updated_at: "10:00 March 12, 2023",
  created_at: "10:00 March 12, 2023",
};

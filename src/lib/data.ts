// src/lib/data.ts

// =========================================
// TIPOS (Necessários para o TypeScript não reclamar)
// =========================================
export type LinkItem = {
  label: string;
  href: string;
  kind?: "press" | "video" | "slides" | "post" | "site";
};

export type SciEvent = {
  title: string;
  date: string;
  location: string;
  geo?: { lat: number; lon: number }; // Adicionei suporte explícito a geo
  org?: string;
  role?: string;
  type: "Seminar" | "Congress" | "Record" | "Press";
  description?: string;
  tags?: string[];
  links?: LinkItem[];
  featured?: boolean;
};

// =========================================
// DADOS
// =========================================

export const personalInfo = {
  name: "Gonçalo",
  location: "Aveiro, Portugal",
  email: "goncalovdfigueiredo@gmail.com",
  github: "https://github.com/goncalo-vfigueiredo",
  linkedin: "https://www.linkedin.com/in/goncalovdfigueiredo/",
  orcid: "https://orcid.org/0000-0002-7097-5511",
  cienciavitae: "https://www.cienciavitae.pt//en/C613-EA2F-CFDC",
  scholar: "https://scholar.google.com/citations?user=z0_cuzYAAAAJ&hl=pt-PT",
  profilePicture: "/profile.jpeg",
  heroDescription:
   "Gonçalo Figueiredo is a Ph.D. Candidate in Electrical and Computer Engineering at Instituto Superior Técnico, focusing his research on the role of photonics in future sustainable smart cities. He holds both an M.Sc. in Physics Engineering and a B.Sc. in Physics Engineering Sciences from the University of Aveiro.",
};

export const education = [
  {
    institution: "Instituto Superior Técnico",
    url: "https://tecnico.ulisboa.pt/",
    location: {
      city: "Lisbon, Portugal",
      lat: 38.736765,
      lon: -9.138948,
    },
    degree: "Ph.D. in Electrical and Computer Engineering",
    period: "Oct 2022 - Present",
    logo: "/IST.png",
    relatedSkills: [
      "Visible Light Communications",
      "Luminescent Solar Concentrators", 
      "PCB Design",  
      "Optoelectronic Prototyping", 
      "IoT & Smart City Infrastructure",
      "Altium Designer & KiCad", 
      "Intel Quartus Prime", 
      "LTspice",
      "Visual Studio Code",
      "Apache Spark", 
      "Python (Data Science & Control)", 
      "MATLAB (Data Acquisition & Signal Processing)", 
      "C/C++ (Embedded)",
      "Verilog (HDL)", 
    ],
    summary: "Started the Doctoral Program in Electrical and Computer Engineering with a focus on sustainable smart city infrastructures.",
    thesisType: "Key Details", 
    thesisTitle: "The role of photonics in future sustainable smart cities: an integrated approach of Visible Light Communications and Luminescent Solar Concentrators",
    abstract: "  ",
    achievements: [
      //"Started the Doctoral Program in Electrical and Computer Engineering with a Thesis entitled “The role of photonics in future sustainable smart cities: an integrated approach of Visible Light Communications and Luminescent Solar Concentrators”.",
      "- Outreach and Teaching Skills-DEEC;",
      "- Processing Big Data;",
      "- Topics in Artificial Intelligence;",
      "- Advanced Wireless Communications;",
      "- Power Management in Microelectronics.",
    ],
  },
  {
    institution: "University of Aveiro",
    url: "https://www.ua.pt/",
    location: {
      city: "Aveiro, Portugal",
      lat: 40.630839,
      lon: -8.655902,
    },
    degree: "M.Sc. in Physics Engineering",
    relatedSkills: [
      "Visible Light Communications",
      "Physical Layer Security & Cryptography", 
      "Optoelectronic Prototyping",
      "Visual Studio Code",
      "Python (Data Science & Control)", 
      "MATLAB (Data Acquisition & Signal Processing)", 
      "C/C++ (Embedded)"
    ],
    period: "Sep 2020 - Sep 2022",
    logo: "/UA.png",
    
    summary: "Concluded the Master in Physics Engineering with a Master Thesis entitled “Secure Visible Light Communication Systems based on Color-Shift Keying” evaluated as 18/20.",
    thesisType: "Key Details",
    thesisTitle: "Secure Visible Light Communication Systems based on Color-Shift Keying",
    abstract: "The progress of communication systems related to the mobility aspects that enable the requirements of the smart cities of the future to be met has been a predominant aspect of research in recent years, especially after the implementation of concepts such as the Internet of Things (IoT), reflecting the absolute need for interconnection in today’s society. This permanent demand for interconnection requires the development of secure, low-latency and high capacity forms of communication. In this context, visible light communication (VLC) systems have emerged as a viable solution to replace conventional systems in data transmission based on electromagnetic carriers with lower frequencies, due to the development of energy-efficient light-emitting diodes (LEDs) that allow to take advantage, in a new approach, of lighting infrastructures, adding to them the capacity of data transmission. Currently, the accessibility and portability by users of a receiver that detects the optical signals transmitted by VLC systems, as well as the privacy required in this transmission of information between users, are important factors for the successful implementation and consolidation of VLC systems on a large scale. This dissertation aims to propose and demonstrate the feasibility for the enhanced VLC technology in terms of security, by using distinct encryption systems for the transmitted optical signal and with error rates compatible with the thresholds of forward error correction (FEC) systems. The feasibility of this solution for use in future smart city environments will also be demonstrated through a case study based on color modulation and the use of a smartphone application to decode the optical signals transmitted by the VLC system. This demonstrates the potential for penetration of this technology in the population that uses mobile phones on a daily basis.",
    achievements: [
      //"Concluded the Master in Physics Engineering with a Master Thesis entitled “Secure Visible Light Communication Systems based on Color-Shift Keying” evaluated as 18/20.",
      "- Operations Research Methods;",
      "- Physics and Technology of Renewable Energies II;",
      "- Lasers and Photonics;",
      "- Optic Communications;",
      "- Dissertation.",
    ],
  },
  {
    institution: "University of Aveiro",
    url: "https://www.ua.pt/",
    location: {
      city: "Aveiro, Portugal",
      lat: 40.630154,
      lon: -8.656815,
    },
    degree: "B.Sc. in Physics Engineering Sciences",
    period: "Sep 2017 - Sep 2020",
    logo: "/UA.png",
    relatedSkills: [
      "Visible Light Communications",  
      "Optoelectronic Prototyping",
      "Visual Studio Code", 
      "Python (Data Science & Control)", 
      "MATLAB (Data Acquisition & Signal Processing)", 
      "C/C++ (Embedded)",
    ],
    summary: "Concluded the Bachelor in Physics Engineering Sciences with a Project entitled “Optical Communications in the Visible Spectral Region” evaluated as 18/20.",
    thesisType: "Key Details",
    thesisTitle: "Optical Communications in the Visible Spectral Region",
    abstract: "Visible Light Communication (VLC) has emerged as a potential solution to the challenges set by Radio Frequency (RF) communication systems. The VLC systems are based on the capacity to modulate at a high rate (Gigabits per second) the light intensity emitted by Light Emitting Diodes (LEDs), making possible to connect the idea of lighting and data transmission in a single device. Furthermore, LEDs are an energy-efficient and low-cost solution for the implementation of wireless optical communication. The main objectives of this work were to implement a VLC system, demonstrate its functionality and study the effect of the integration of an optical pre-amplifier into the system. To integrate the proposed VLC system, the optical amplifiers, which have been tested in the preamplifier configuration, presented a high quantum photoluminescence yield (q>50%), emission in the blue spectral region (440-460 nm) under ultraviolet radiation, exhibited transparency under visible light and also have thermal stability and mechanical flexibility. The integration of this component allowed to obtain a maximum increase in the amplitude of signal of 2.5 dB, showing that the methodology proposed in this work is a cost-effective and promising solution for optical amplification in VLC systems.",
    achievements: [
      //"Concluded the Bachelor in Physics Engineering Sciences with a Project entitled “Optical Communications in the Visible Spectral Region” evaluated as 18/20.",
      "- Electric Circuits;",
      "- Electronics;",
      "- Applied Optics;",
      "- Advanced Laboratory I;",
      "- Advanced Laboratory II;",
      "- Project.",
    ],
  },
];

export const workExperience = [
  {
    company: "Lightenjin II - Industria de Iluminação, Instituto de Telecomunicações & CICECO - Aveiro Institute of Materials",
    position: "Industrial Ph.D. Candidate",
    period: "Sep 2023 - Present",
    logos: ["/lightenjin.png", "/it.png", "/ciceco.png"],
    
    companyLinks: [
      { 
        name: "Lightenjin II - Industria de Iluminação, Lda", 
        url: "https://lightenjin.pt/",
        location: { 
          city: "Aguada de Cima, Portugal", 
          lat: 40.549461, 
          lon: -8.395468 
        }
      },
      { 
        name: "Instituto de Telecomunicações (Aveiro and Lisbon)", 
        url: "https://www.it.pt/",
        location: { 
          city: "Aveiro and Lisbon, Portugal", 
          lat: 38.737709, 
          lon: -9.138499 
        }
      },
      { 
        name: "CICECO - Aveiro Institute of Materials", 
        url: "https://www.ciceco.ua.pt/",
        location: { 
          city: "Aveiro, Portugal", 
          lat: 40.637747, 
          lon: -8.658116 
        }
      }
    ],
    relatedSkills: [
      "Visible Light Communications",
      "Luminescent Solar Concentrators",
      "Optoelectronic Prototyping",
      "PCB Design",
      "IoT & Smart City Infrastructure",
      "Altium Designer & KiCad",
      "Intel Quartus Prime",
      "LTspice",
      "Python (Data Science & Control)",
      "MATLAB (Data Acquisition & Signal Processing)",
      "C/C++ (Embedded)",
      "Verilog (HDL)",
    ],
    projecttitle: [
      "Research and development initiative in progress. Specific project details are currently in the execution phase.",
      "**Project: ",
      "**Area: ",
    ],
    achievements: [
      "Ongoing execution. Key outcomes and milestones will be updated as the project matures.",
    ],
  },
  {
    company: "Instituto Superior Técnico",
    location: {
      city: "Lisbon, Portugal",
      lat: 38.736727,
      lon: -9.139772,
    },
    position: "Teaching Collaborator",
    period: "Feb 2023 - Jul 2023",
    logos: ["/IST.png"],
    
    url: "https://tecnico.ulisboa.pt/",
    courses: [
      { name: "Curricular Unit: Optoelectronics", url: "https://fenix.tecnico.ulisboa.pt/disciplinas/Opto/2022-2023/2-semestre/pagina-inicial" },
      { name: "Curricular Unit: Optical Communication Systems", url: "https://fenix.tecnico.ulisboa.pt/disciplinas/SCO2/2022-2023/2-semestre" },
    ],
    achievements: [
      "Taught hands-on laboratory classes, developed documentation/assessment methods, and provided technical feedback to students enrolled in the Optoelectronics and Optical Communication Systems courses at the Department of Electrical and Computer Engineering (DEEC) of the Instituto Superior Técnico.",
    ],
  },
  {
    company: "Instituto de Telecomunicações",
    location: {
      city: "Aveiro, Portugal",
      lat: 40.634951,
      lon: -8.660138,
    },
    url: "https://www.it.pt/ITSites/Index/3",
    position: "Research Fellow",
    period: "Oct 2022 - Jun 2023",
    logos: ["/it.png"],
    relatedSkills: ["Luminescent Solar Concentrators","MATLAB (Data Acquisition & Signal Processing)", 
    "C/C++ (Embedded)", ],
    projecttitle: [
      "**Project: PLANETa (CENTRO-01-0145-FEDER-181242) - Photonic devices for energy generation from sunlight and temperature sensing towards real-time and user-based post-occupancy evaluation in zero-energy buildings",
      "**Area: Optics & Photonics",
    ],
    achievements: [
      "Research Fellowship dedicated to the design and assembly of a large-scale luminescent solar concentrator (LSC) prototype, fabricated at the scale of a real window and capable of energy generation and optical temperature sensing, integrated into an Internet of Things (IoT) platform.",
    ],
  },
  {
    company: "Instituto de Telecomunicações",
    position: "Research Fellow",
    period: "Jan 2022 - Jun 2022",
    relatedSkills: ["Visible Light Communications","Physical Layer Security & Cryptography", "Optoelectronic Prototyping", "Android Studio", 
    "MATLAB (Data Acquisition & Signal Processing)", 
    "C/C++ (Embedded)", 
    "Java / Kotlin",],
    location: {
      city: "Lisbon, Portugal",
      lat: 38.737489,
      lon: -9.138458,
    },
    url: "https://www.it.pt/ITSites/Index/1",
    logos: ["/it.png"],
    projecttitle: [
      "**Project: PC102 – UIDB/50008/2020",
      "**Area: Optics & Photonics",
    ],
    achievements: [
      "Research Fellowship dedicated to the design, development, simulation, implementation, integration, validation, and demonstration of visible light communication (VLC) systems with data encryption.",
    ],
  },
];

export const LeadershipExperience = [

  {
    company: "IEEE, Elsevier & Optica", 
    location: "Remote",
    position: "Invited Peer Reviewer", 
    period: "Oct 2024 - Present", 
    logo: "/IEEE.png", 
    logos: ["/IEEE.png", "/Elsevier.png", "/Optica.png"],
    // ADICIONA ISTO AQUI:
    publishersTimeline: [
      { name: "Optica", period: "Oct 2024 - Jun 2026", logo: "/Optica.png" } ,     
      { name: "Elsevier", period: "Nov 2024 - Nov 2025", logo: "/Elsevier.png" }, 
      { name: "IEEE", period: "Dec 2024 - Present", logo: "/IEEE.png" },
    ],
    achievements: [
      "Invited peer reviewer for high-impact journals, ensuring scientific integrity through the critical evaluation of 65+ manuscripts in IoT, optics, and photonics.",
      "__chart__", 
    ],
},

 
  {
    company: "CICECO - Aveiro Institute of Materials",
    location: {
      city: "Aveiro, Portugal",
      lat: 40.637747,
      lon: -8.658116,
    },
    position: "PhD Student Council Secretary",
    period: "Jan 2025 - Sep 2026",
    logo: "/ciceco.png",
    relatedLocations: [
      {
        label: "Linköping University (Exchange Visit)",
        city: "Linköping, Sweden",
        lat: 58.4108,
        lon: 15.6214,
      },
      {
        label: "KTH Royal Institute of Technology (Exchange Visit)",
        city: "Stockholm, Sweden",
        lat: 59.3498,
        lon: 18.0702,
      }
    ],
    achievements: [
      "Advocating for 250+ PhD candidates by leading high-impact initiatives that foster academic excellence, community engagement, and academia-industry integration:",
      {
        type: "activity_grid",
        year: "2026", 
        items: [
          { label: "AIM Further", icon: "Rocket", tag: "Event" },
          { label: "Welcome Guide", icon: "BookOpen", tag: "Resource" },
          { label: "Research Summit", icon: "Medal", tag: "PhD Jury" },
          { label: "Quiz Night", icon: "BrainCircuit", tag: "Event" },
          //{ label: "Karaoke Night", icon: "Mic", tag: "Event" },
          
        ]
      },
      {
        type: "activity_grid",
        year: "2025", 
        items: [
          { label: "AIM Further", icon: "Rocket", tag: "Event" },
          { label: "CICECO Welcome Event", icon: "HeartHandshake", tag: "Event" },
          { label: "Jornadas CICECO", icon: "Rocket", tag: "Event" },
          { label: "Research Summit", icon: "Medal", tag: "PhD Jury" },
          { label: "Quiz Night", icon: "BrainCircuit", tag: "Event" },
          { label: "Game Night", icon: "Gamepad2", tag: "Event" },
          { label: "WhatsApp Community", icon: "MessageCircleHeart", tag: "Community" },
          { label: "Sweden Exchange", icon: "Globe", tag: "Networking" },
        ]
      }
    ],
  },
  
  
  {
    company: "Instituto Superior Técnico",
    location: {
      city: "Lisbon, Portugal",
      lat: 38.737867,
      lon: -9.138925,
    },
    position: "Co-supervisor of M.Sc. thesis",
    period: "Sep 2023 - Dec 2024",
    logo: "/IST.png",
    achievements: [
      "Co-supervised a 2nd Cycle Integrator Project and a Master's thesis in Electrical and Computer Engineering.",
      "The thesis, authored by a M.Sc. student, was entitled “Developing a Cost-efficient Secure Visible Light Communication System with Chaotic Scrambling.”",
    ],
  },
  {
    company: "Corpo Nacional de Escutas",
    location: {
      city: "Aveiro, Portugal",
      lat: 40.608106,
      lon: -8.591017,
    },
    position: "Scout",
    period: "Oct 2008 - Oct 2021",
    logo: "/scout.png",
    achievements: [
"Developed adaptability and practical problem-solving, learning to find effective solutions even with limited tools or under pressure.",
"Honed leadership and project management skills by organizing complex logistics for field activities, fostering teamwork and resilience in dynamic environments.",

    ],
  },
];

export const skills = {
  coreTechnical: [
    "Visible Light Communications",  // A tua "bandeira" principal
    "Luminescent Solar Concentrators", // O foco do teu PhD (CAT)
    "Physical Layer Security & Cryptography", // O diferencial do teu Mestrado (Chaos/CSK)
    "Optoelectronic Prototyping", // Mais preciso que "Hardware Prototyping" (licenciatura)
    "PCB Design", // Especificar ferramentas aqui ajuda no SEO do CV
    "FPGA",
    "IoT & Smart City Infrastructure", // Contexto de aplicação (CAT)
  ],
  programmingLanguages: [
    "Python (Data Science & Control)", 
    "MATLAB (Data Acquisition & Signal Processing)", 
    "C/C++ (Embedded)",
    "Verilog (HDL)", 
    "Java / Kotlin",
    "LaTeX",
  ],
  toolsAndSoftware: [
    "Altium Designer & KiCad",
    "Intel Quartus Prime", 
    "LTspice",
    "Visual Studio Code",
    "Android Studio",
    "Apache Spark",
    "OriginLab", // Mantém: Valorizado em I&D
    "Git & Version Control", // ADICIONADO: Essencial para qualquer engenheiro de software/firmware
    "Microsoft Office",
  ],
  operatingSystems: [
    "macOS", 
    "Windows",
    "Linux (Ubuntu/Debian)" // Especificar a distro mostra mais proficiência
  ],
  languages: [
    "🇵🇹 Portuguese (CEFR C2 - Native)",
    "🇬🇧 English (CEFR C1 - Advanced)",
    "🇩🇪 German (CEFR A2 - Elementary)",
  ],
};


export const projects = [
  {
    title: "Lorem Ipsum Project",
    github: "",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
      "Excepteur sint occaecat cupidatat non proident.",
    ],
  },
  {
    title: "Dolor Sit Amet App",
    github: "",
    description: [
      "Morbi in sem quis dui placerat ornare.",
      "Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam.",
      "Praesent dapibus, neque id cursus faucibus.",
      "Fusce feugiat malesuada odio.",
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.",
    ],
  },
];


export const scientificEvents: SciEvent[] = [
  {
    title: "Instituto de Telecomunicações Lisbon Meeting 2025",
    date: "Dec 2025",
    location: "Lisbon, Portugal",
    geo: { lat: 38.7436, lon: -9.1586 },
    org: "Instituto de Telecomunicações",
    role: "Selected Speaker",
    type: "Congress",
    description: "Selected for the PhD Pitch Session to present advancements in industrial IoT and photonic integration to a specialized telecommunications audience.",
    tags: ["Pitch", "Telecommunications", "R&D"],
    featured: true, 
  },
  {
    title: "European Researchers' Night (2024 & 2025)",
    date: "Sep 2025",
    location: "Aveiro, Portugal",
    geo: { lat: 40.6405, lon: -8.6538 },
    org: "University of Aveiro",
    role: "Science Demonstrator",
    type: "Seminar",
    description: "Interactive demonstrations on 'Smart Windows' for energy harvesting and temperature sensing. Engaged with the general public to demystify how transparent photonic materials can generate power and monitor environmental conditions.",
    tags: ["Smart Windows", "Energy Harvesting", "Public Demo"],
  },
  {
    title: "Ciclo de Palestras do Ci-Fóton",
    date: "Nov 2024",
    location: "Online",
    geo: { lat: -20.272151, lon: -40.306475 }, 
    org: "LabTel - UFES (Brazil)",
    role: "Invited Speaker",
    type: "Seminar",
    description: "Invited presentation on 'Enhancing Visible Light Communications using a Large-Scale Luminescent Solar Concentrator Receiver'. Part of a joint international seminar series bridging research between Brazil (UFES) and Portugal (Instituto de Telecomunicações & CICECO).",
    tags: ["VLC", "LSC", "International Colab"],
    links: [{ label: "LinkedIn post", href: "https://www.linkedin.com/posts/goncalovfigueiredo_this-friday-8th-at-1-pm-portugal-time-activity-7257850956480962561-sPk_", kind: "post" }],
    featured: true,
  },
  {
    title: "Smart City Expo World Congress",
    date: "Nov 2024",
    location: "Barcelona, Spain",
    geo: { lat: 41.35485, lon: 2.127521 },
    org: "Lightenjin",
    role: "Exhibitor / Presenter",
    type: "Congress",
    description: "Showcased lighting solutions for future cities, combining efficient LED technology with advanced control systems.",
    tags: ["Smart Cities", "Industry 4.0", "Product Demo"],
    links: [
      { label: "Company post", href: "https://www.linkedin.com/posts/lightenjin_lightenjin-and-lightmobie-will-be-present-activity-7257797477678940160-E0Q5", kind: "post" },
      { label: "Event website", href: "https://www.smartcityexpo.com/", kind: "site" },
    ],
    featured: true,
  },
  {
    title: "Jornadas CICECO 2024",
    date: "Oct 2024",
    location: "Oliveira de Azeméis, Portugal",
    geo: { lat: 40.8354, lon: -8.4764 },
    org: "CICECO - Aveiro Institute of Materials",
    role: "Pitch Finalist",
    type: "Congress",
    description: "Selected as a Finalist after a pre-competition (pitch + jury Q&A). Delivered a 5-minute public pitch on doctoral research followed by a jury defense, demonstrating the ability to condense complex R&D into a compelling value proposition.",
    tags: ["Pitch Competition", "Public Defense", "Communication"],
  },
  {
    title: "Largest Computer Programming Lesson",
    date: "Oct 2024",
    location: "Lisbon, Portugal",
    geo: { lat: 38.7369, lon: -9.1426 },
    org: "Instituto Superior Técnico",
    role: "Participant",
    type: "Record",
    description: "Guinness World Record attempt covering Algorithms & OOP, Python development, and introductory AI.",
    tags: ["Python", "Algorithms", "AI"],
    links: [{ label: "Guinness Record", href: "https://www.guinnessworldrecords.com/world-records/117645-largest-computer-programming-lesson", kind: "site" }],
  },
  //{
  //  title: "Media Coverage of Ph.D. Research (PLANETa)",
  //  date: "Jun 2024",
  //  location: "Portugal (National Media)",
  //  geo: { lat: 40.6405, lon: -8.6538 },
  //  org: "IST • UA • Lightenjin",
  //  role: "Featured Research",
   // type: "Press",
  //  description: "Research featured across national television (SIC Notícias, RTP), radio, and press, highlighting the societal impact of the PLANETa project.",
  //  tags: ["Media Relations", "Photonics", "Innovation"],
  //  links: [
  //    { label: "Público", href: "https://www.publico.pt/2024/05/29/azul/noticia/investigadores-universidade-aveiro-cria-vidro-gera-energia-partir-luz-solar-2092199", kind: "press" },
  //    { label: "SIC Notícias", href: "https://sicnoticias.pt/pais/2024-06-21-video-universidade-de-aveiro-cria-janela-capaz-de-produzir-energia-49c3f721", kind: "press" },
  //  ],
  //  featured: true,
  //},
  {
    title: "Radiociência Podcast (Ep. 3)",
    date: "Mar 2024",
    location: "Online",
    geo: { lat: 38.7412, lon: -9.1567 },
    org: "URSI Portuguese Committee",
    role: "Invited Speaker", 
    type: "Press",
    description: "Invited guest as the 1st Place Winner of the Best Student Paper Award. Discussed the winning research on 'Photonic devices for sustainable IoT' and Large-Scale Solar Concentrators alongside other distinguished researchers.",
    tags: ["Podcast", "Award Winner", "Sustainable IoT"],
  },
  {
    title: "17th Congress of the Portuguese Committee of URSI",
    date: "Nov 2023",
    location: "Lisbon, Portugal",
    geo: { lat: 38.7368, lon: -9.1554 },
    org: "URSI / ANACOM",
    role: "1st Place Winner", 
    type: "Congress",
    description: "Winner of the Best Student Paper Award (1st Place). Authored, presented, and defended the manuscript 'Photonic device based on a large-scale transparent luminescent solar concentrator' under the theme 'Smart materials for radioscience'.",
    tags: ["Radioscience", "Smart Materials", "VLC"],
    featured: true,
  },
];

export const publications = [
  {
    title: "Luminescent solar concentrators: Current and future applications in smart cities",
    authors: ["Gonçalo Figueiredo et al."],
    venue: "Handbook on the Physics and Chemistry of Rare Earths (Elsevier)",
    year: 2024,
    citations: 7,
    abstract: "This chapter explores the evolution and potential applications of luminescent solar concentrators (LSCs)...",
    github: "https://www.sciencedirect.com/science/article/abs/pii/S0168127324000187",
    manuscript: "book chapter",
    links: {
      bibtex: "@incollection{figueiredo2024luminescent, title={Luminescent solar concentrators: Current and future applications in smart cities}, author={Figueiredo, Gon{\c{c}}alo and Correia, Sandra FH and Fu, Lianshe and de Zea Bermudez, Ver{\'o}nica and Neto, Albano N Carneiro and Andr{\'e}, Paulo S and Ferreira, Rute AS}, booktitle={Handbook on the Physics and Chemistry of Rare Earths}, volume={66}, pages={51--123}, year={2024}, publisher={Elsevier}}"
    },
    description: [],
    image: "/GVDF_1.jpg",
  },
  {
    title: "Transparent nature-based luminescent solar concentrator with NIR emission and integrated thermal sensing",
    authors: ["Sandra Correia et al."],
    venue: "Journal of Materials Chemistry A",
    image: "/GVDF_2.jpg",
    year: 2025,
    citations: 3,
    abstract: "The engineering of luminescent solar concentrators (LSCs) offers a way to turn windows into energy-generating units...",
    github: "https://pubs.rsc.org/en/content/articlelanding/2025/ta/d4ta08036j",
    manuscript: "journal article",
    links: {
      bibtex: "@article{correia2025transparent, title={Transparent nature-based luminescent solar concentrator with NIR emission and integrated thermal sensing}, author={Correia, Sandra FH and Falc{\~a}o, Bruno P and Figueiredo, Gon{\c{c}}alo and Vaz, B{\'a}rbara MC and Contieri, Let{\'\i}cia S and de Souza Mesquita, Leonardo M and Almeida, Juliana and Fradinho, Joana C and Pinto, Diana CGA and Fu, Lianshe and others}, journal={Journal of Materials Chemistry A}, volume={13}, number={16}, pages={11886--11898}, year={2025}, publisher={Royal Society of Chemistry} }"
    },
    description: [],
  },
  {
    title: "Multi‐Surface Adhesion Luminescent Solar Concentrators for Supply‐Less IoT",
    authors: ["Gonçalo Figueiredo et al."],
    image: "/GVDF_3.jpg",
    venue: "Advanced Science",
    year: 2024,
    citations: 11, 
    abstract: "The growing prevalence of Internet of Things (IoT) devices hinges on resolving the challenge of powering sensors and transmitters...",
    github: "https://advanced.onlinelibrary.wiley.com/doi/full/10.1002/advs.202400540",
    manuscript: "journal article",
    links: {
      bibtex: "@article{figueiredo2024multi, title={Multi-Surface Adhesion Luminescent Solar Concentrators for Supply-Less IoT}, author={Figueiredo, Gon{\c{c}}alo and Correia, Sandra FH and Falc{\~a}o, Bruno P and Sencadas, Vitor and Fu, Lianshe and Andr{\'e}, Paulo S and Ferreira, Rute AS}, journal={Advanced Science}, volume={11}, number={35}, pages={2400540}, year={2024}, publisher={Wiley Online Library} }"
    },
    description: [],
  },
  {
    title: "Enhancing secret key distribution through advanced color modulation in visible light communication",
    authors: ["Gonçalo Figueiredo et al."],
    image: "/GVDF_4.jpg",
    venue: "Journal of Optical Communications and Networking",
    year: 2024,
    citations: 6, 
    abstract: "Visible light communication (VLC) has emerged as a dynamic area of research poised to revolutionize high-speed wireless communication...",
    github: "https://opg.optica.org/jocn/abstract.cfm?uri=jocn-16-8-D1",
    manuscript: "journal article",
    links: {
      bibtex: "@article{figueiredo2024enhancing, title={Enhancing secret key distribution through advanced color modulation in visible light communication}, author={Figueiredo, Gon{\c{c}}alo and Ferreira, Rute AS and Andr{\'e}, Paulo S}, journal={Journal of Optical Communications and Networking}, volume={16}, number={8}, pages={D1--D9}, year={2024}, publisher={Optica Publishing Group} }"
    },
    description: [],
  },
  {
    title: "Time-gated multi-dimensional luminescence thermometry via carbon dots for precise temperature mobile sensing",
    authors: ["Sílvia Silva et al."],
    image: "/GVDF_5.jpg",
    venue: "Nanoscale",
    year: 2024,
    citations: 6, 
    abstract: "Luminescence thermometry presents precise remote temperature measurement capabilities but faces significant challenges...",
    github: "https://pubs.rsc.org/en/content/articlelanding/2024/nr/d4nr03155e",
    manuscript: "journal article",
    links: {
      bibtex: "@article{silva2024time, title={Time-gated multi-dimensional luminescence thermometry via carbon dots for precise temperature mobile sensing}, author={Silva, S{\'\i}lvia FV and Figueiredo, Gon{\c{c}}alo and Pereira, Rui FP and de Zea Bermudez, Ver{\'o}nica and Fu, Lianshe and Andr{\'e}, Paulo S and Neto, Albano N Carneiro and Ferreira, Rute AS}, journal={Nanoscale}, volume={16}, number={44}, pages={20532--20541}, year={2024}, publisher={Royal Society of Chemistry} }"
    },
    description: [],
  },
  
  {
    title: "Walsh-coded orthogonal chaotic shift keying for key distribution in visible light communication systems",
    authors: ["Tiago Silvério et al."],
    image: "/GVDF_6.jpg",
    venue: "Optics Communications",
    year: 2022,
    citations: 4, 
    abstract: "In contemporary society, secure communications employing chaotic communication schemes have opened new challenges...",
    github: "https://www.sciencedirect.com/science/article/abs/pii/S0030401821007872",
    manuscript: "journal article",
    links: {
      bibtex: "@article{silverio2022walsh, title={Walsh-coded orthogonal chaotic shift keying for key distribution in visible light communication systems}, author={Silv{\'e}rio, Tiago and Figueiredo, Gon{\c{c}}alo and Ferreira, Rute AS and Andr{\'e}, Paulo S}, journal={Optics Communications}, volume={505}, pages={127538}, year={2022}, publisher={Elsevier} }"
    },
    description: [],
  },
  {
    title: "Screen-to-Camera Visible Light Communication on Smartphones Using CSK Modulation and Cell-Based Encoding",
    authors: ["Amanda Barreira et al."],
    image: "/GVDF_95.jpg",
    venue: "2025 SBMO/IEEE MTT-S International Microwave and Optoelectronics Conference (IMOC)",
    year: 2025,
    github: "https://ieeexplore.ieee.org/abstract/document/11365743",
    abstract: "The saturation of radio frequency bands has driven the adoption of new communication mechanisms. In this context, Visible Light Communication (VLC) has emerged as a strong candidate, enabling simultaneous communication and illumination by exploring the visible spectrum, which is unlicensed. This work investigates communication between portable devices, particularly smartphones' screens and cameras, using the Color Shift Keying (CSK) modulation technique and an alternative approach based on spatial cell patterns, similar to QR codes. Preliminary results demonstrate that CSK enables reliable communication up to 1 meter at 1 symbol/s, while the cell-based method shows robustness under various lighting and distance conditions.",
    //github: 
    manuscript:  "conference paper",
    geo: { lat: -7.236150, lon: -35.862474 }, 
    links: {
      //bibtex: "@inproceedings{barreira2025visible, title={Visible Light Communication for Autonomous Mobile Platform: Evaluation of 16-QAM Transmission System}, author={Barreira, Amanda R{\"u}hlemann and Kalinowski, Hypolito Jos{\'e} and Figueiredo, Gon{\c{c}}alo and de Brito Andr{\'e}, Paulo S{\'e}rgio}, booktitle={2025 IEEE International Conference on Consumer Technology-Europe (ICCT-Europe)}, pages={1--4}, year={2025}, organization={IEEE}}"
    },
    description: [],
  },
  {
    title: "Visible Light Communication for Autonomous Mobile Platform: Evaluation of 16-QAM Transmission System",
    authors: ["Amanda Barreira et al."],
    image: "/GVDF_94.jpg",
    venue: "2025 IEEE International Conference on Consumer Technology-Europe (ICCT-Europe)",
    year: 2025,
    abstract: "Visible Light Communication (VLC) has gained popularity and aroused interest in recent years, due to its high-speed data transmission capacity, unlicensed spectrum, and the possibility of using existing infrastructures. This work explores an alternative to implement the mentioned technology using general purpose hardware, with the aim of building a complete and integrated system transmission for (Internet of Things) IoT applications. To guarantee the integrity of transmitted data, the entire system uses a logistic map encryption method. Preliminary results indicate that transmission with error rates below the Forward Error Correction (FEC) threshold can be achieved using 16-QAM (Quadrature Amplitude Modulation) technique in different scenarios, at a rate of 500 Baud and distances up to 2 meters. As a second analysis, experiments were also carried out on transmission with an intermediate central unit between the transmitter and receiver modules.",
    github: "https://ieeexplore.ieee.org/abstract/document/11157693?casa_token=TB0h0cx5mjcAAAAA:qLlUMWRPw4VeXNETx_BPDi6eLhy069wHcRWAKwXfV22LInGMm_BUFT3AaNX59e1D5Qx3odX037M",
    manuscript:  "conference paper",
    geo: { lat: 37.016663, lon: -7.936548 }, 
    citations: 1, 
    links: {
      bibtex: "@inproceedings{barreira2025visible, title={Visible Light Communication for Autonomous Mobile Platform: Evaluation of 16-QAM Transmission System}, author={Barreira, Amanda R{\"u}hlemann and Kalinowski, Hypolito Jos{\'e} and Figueiredo, Gon{\c{c}}alo and de Brito Andr{\'e}, Paulo S{\'e}rgio}, booktitle={2025 IEEE International Conference on Consumer Technology-Europe (ICCT-Europe)}, pages={1--4}, year={2025}, organization={IEEE}}"
    },
    description: [],
  },
  {
    title: "A Large-scale Visible Light Communications Receiver based on Luminescent Solar Concentrator",
    authors: ["Gonçalo Figueiredo et al."],
    venue: "2024 Conference on Lasers and Electro-Optics (CLEO)",
    year: 2024,
    citations: 1, 
    abstract: "We proposed a large dimension visible light communications receiver...",
    github: "https://opg.optica.org/abstract.cfm?uri=CLEO_FS-2024-JTu2A.88",
    manuscript: "conference paper",
    image: "/GVDF_93.jpg",
    geo: { lat: 35.2228, lon: -80.8465 }, 
    links: {
      bibtex: "@inproceedings{figueiredo2024large...}"
    },
    description: [],
  },
  {
    title: "Security enhanced encryption on color modulation of visible light communication systems",
    authors: ["Gonçalo Figueiredo et al."],
    venue: "2023 SBMO/IEEE MTT-S International Microwave and Optoelectronics Conference (IMOC)",
    year: 2023,
    citations: 5, 
    abstract: "Visible Light Communication (VLC) is an emerging technology...",
    github: "https://ieeexplore.ieee.org/abstract/document/10379763",
    manuscript: "conference paper",
    image: "/GVDF_92.jpg",
    geo: { lat: 41.27955, lon: 1.980151 }, 
    links: {
      bibtex: "@inproceedings{figueiredo2023security...}"
    },
    description: [],
  },
  {
    title: "Photonic device based on a large-scale transparent luminescent solar concentrator for visible light communications for a sustainable Internet of Things",
    authors: ["Gonçalo Figueiredo et al."],
    venue: "17th Congress of the Portuguese Committee of URSI",
    year: 2023,
    manuscript: "conference paper",
    image: "/GVDF_91.jpg",
    geo: { lat: 38.735617, lon: -9.159467 }, 
    links: {
      bibtex: ""
    },
    description: [],
  },
  {
    title: "Privacy Increase in VLC System Based on Hyperchaotic Map",
    authors: ["Tiago Silvério et al."],
    venue: "2021 Telecoms Conference (ConfTELE)",
    image: "/GVDF_9.jpg",
    year: 2021,
    citations: 1, 
    abstract: "Visible light communications (VLC) have been the focus...",
    github: "https://ieeexplore.ieee.org/abstract/document/9435485",
    manuscript: "conference paper",
    geo: { lat: 39.734266, lon: -8.821668 }, 
    links: {
      bibtex: "@inproceedings{silverio2021privacy...}"
    },
    description: [],
  },
  {
    title: "Secure Visible Light Communication Systems based on Color-Shift Keying",
    authors: ["Gonçalo Figueiredo"],
    venue: "University of Aveiro (Dissertation)",
    year: "Sep 2022",
    image: "/GVDF_8.jpg",
    abstract: "The progress of communication systems related to the mobility aspects...",
    manuscript: "monograph",
    links: {},
    description: [],
  },
  {
    title: "Optical Communications in the Visible Spectral Region",
    authors: ["Gonçalo Figueiredo"],
    image: "/GVDF_7.jpg",
    venue: "University of Aveiro (Project)",
    year: "Jun 2020",
    abstract: "Visible Light Communication (VLC) has emerged as a potential solution...",
    manuscript: "monograph",
    links: {},
    description: [],
  },
];

export const awards = [
  {
    name: "Best Student Paper Award",
    issuer: "17th Congress of the Portuguese Committee of URSI (Smart materials for radioscience)",
    date: "Nov 2023",
    type: "National",
    description: "Each year, the Portuguese Committee of URSI holds a congress, with the objective of stimulating, promoting and co-ordinating studies, at a national level, in the areas of radioelectric, telecommunications, and electronics science. ANACOM is responsible for organising proceedings.",
    position: "First Place",
    links: [
      { label: "Autoridade Nacional de Comunicações (ANACOM)", url: "https://www.anacom.pt/render.jsp?contentId=1771803&languageId=1" },
      { label: "Instituto de Telecomunicações", url: "https://www.it.pt/News/NewsPost/4961" }
    ]
  },
  {
    name: "PhD Scholarship",
    details: "Ref: 2023.00526.BDANA", 
    issuer: "Fundação para a Ciência e a Tecnologia (FCT)",
    date: "Oct 2023",
    type: "National",
    description: "Research grant to support PhD studies in Electrical and Computer Engineering, under a specific line for applications in non-academic environments.",
    hosts: [
      { name: "Lightenjin II - Indústria de Iluminação Lda", url: "https://lightenjin.pt" },
      { name: "Instituto de Telecomunicações", url: "https://www.it.pt" },
      { name: "CICECO - Aveiro Institute of Materials", url: "https://www.ciceco.ua.pt" }
    ]
  },
];

// src/lib/data.ts

export const featuredIn = [
  {
    source: "CNN Portugal",
    description: "CNN Innovation segment showcasing cutting-edge research and scientific excellence at the University of Aveiro's Physics Department.",
    date: "Jul 2025",
    type: "TV News", // Mantém
    link: "https://cnnportugal.iol.pt/videos/cnn-inovacao-universidade-de-aveiro-departamento-de-fisica/688a045b0cf2ba9f720f0963"
  },
  {
    source: "SIC Notícias",
    description: "TV interview showcasing the PLANETa project and smart window technology.",
    date: "Jun 2024",
    type: "TV News", // Mantém
    link: "https://sicnoticias.pt/pais/2024-06-21-video-universidade-de-aveiro-cria-janela-capaz-de-produzir-energia-49c3f721"
  },
  {
    source: "Público",
    description: "Featured article on glass that generates energy from sunlight.",
    date: "May 2024",
    type: "Online News", // MUDADO: De "Newspaper" para "Online News"
    link: "https://www.publico.pt/2024/05/29/azul/noticia/investigadores-universidade-aveiro-cria-vidro-gera-energia-partir-luz-solar-2092199"
  },
  {
    source: "RTP",
    description: "Report on coated glass capturing invisible sunlight for photovoltaics.",
    date: "May 2024",
    type: "Online News", // MUDADO
    link: "https://www.rtp.pt/noticias/economia/vidro-revestido-capta-luz-solar-invisivel-para-alimentar-celulas-fotovoltaicas_n1586094"
  },
  {
    source: "Diário de Aveiro",
    description: "Printed article: 'Glass capable of generating electricity from sunlight'.",
    date: "May 2024",
    type: "Print Newspaper", 
  },
  {
    source: "University of Aveiro",
    description: "Glass that isn't glass... It's the future of energy use",
    date: "May 2024",
    type: "Institutional",
    link: "https://www.ua.pt/en/noticias/9/86735"
  },
  {
    source: "Podcast da Radiociência (Ep. 3)",
    description: "Guest speaker discussing the award-winning research at the Congress of the Portuguese Committee of URSI.",
    date: "Mar 2024",
    type: "Podcast",
    link: "https://open.spotify.com/episode/6sB2t3xHQMnBWxnTFtxr0q"
  },
  {
    source: "Instituto de Telecomunicações",
    description: "Official coverage of the ANACOM-URSI 1st Place Award distinction.",
    date: "Nov 2023",
    type: "Institutional",
    link: "https://www.it.pt/News/NewsPost/4961"
  },
  {
    source: "ANACOM",
    description: "Official announcement of the Best Student Paper Award (1st Prize) at the 17th URSI Congress.",
    date: "Nov 2023",
    type: "Institutional",
    link: "https://www.anacom.pt/render.jsp?contentId=1771803&languageId=1" 
  }
];
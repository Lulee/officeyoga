export const locales = ["en", "zh-CN"] as const;

export type Locale = (typeof locales)[number];

export type Messages = {
  nav: {
    home: string;
    blog: string;
    about: string;
    privacy: string;
    language: string;
    themeSystem: string;
    themeLight: string;
    themeDark: string;
  };
  footer: {
    rights: string;
    about: string;
    privacy: string;
    contact: string;
  };
  newsletter: {
    label: string;
    subscribe: string;
    placeholder: string;
    success: string;
  };
  post: {
    readMore: string;
    relatedLabel: string;
    relatedTitle: string;
    articleEnjoyed: string;
    articleDescription: string;
    taggedLabel: string;
    continueLabel: string;
  };
  home: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    focuses: string[];
    latestEyebrow: string;
    latestTitle: string;
    viewAll: string;
    newsletterTitle: string;
    newsletterDescription: string;
    featuredEyebrow: string;
    featuredTitle: string;
    featuredDescription: string;
    topicEyebrow: string;
    topicTitle: string;
    topicDescription: string;
    topicRead: string;
    pathEyebrow: string;
    pathTitle: string;
    pathCards: Array<{
      title: string;
      description: string;
    }>;
  };
  blog: {
    eyebrow: string;
    title: string;
    description: string;
    pageLabel: string;
    previous: string;
    next: string;
    filterLabel: string;
    clearFilter: string;
    showingTag: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    coverageTitle: string;
    coverageBody: string;
    contactTitle: string;
    contactBody: string;
  };
  privacy: {
    title: string;
    intro: string;
    sections: Array<{
      title: string;
      body: string;
    }>;
  };
};

export const messages: Record<Locale, Messages> = {
  en: {
    nav: {
      home: "Home",
      blog: "Blog",
      about: "About",
      privacy: "Privacy",
      language: "Language",
      themeSystem: "System",
      themeLight: "Light",
      themeDark: "Dark",
    },
    footer: {
      rights: "Office Yoga Blog. All rights reserved.",
      about: "About",
      privacy: "Privacy",
      contact: "Contact",
    },
    newsletter: {
      label: "Newsletter",
      subscribe: "Subscribe",
      placeholder: "Enter your email",
      success: "Thanks for subscribing. Your next workday reset is on the way.",
    },
    post: {
      readMore: "Read more",
      relatedLabel: "Related Reading",
      relatedTitle: "More articles you may like",
      articleEnjoyed: "Enjoyed this article?",
      articleDescription:
        "Subscribe for gentle, practical wellness ideas you can use between meetings.",
      taggedLabel: "Tagged",
      continueLabel: "Continue exploring",
    },
    home: {
      eyebrow: "Office Wellness Journal",
      title: "Small yoga rituals for calmer, stronger workdays.",
      description:
        "Evidence-informed stretches, desk yoga flows, and posture resets designed for busy teams, remote workers, and anyone spending long hours at a screen.",
      primaryCta: "Explore the blog",
      secondaryCta: "Join the newsletter",
      focuses: [
        "10-minute desk flows for mid-afternoon energy",
        "Neck, shoulders, and wrists routines for screen-heavy work",
        "Mindful posture habits that actually fit modern schedules",
      ],
      latestEyebrow: "Latest Articles",
      latestTitle: "Fresh reads for healthier office routines",
      viewAll: "View all posts",
      newsletterTitle: "Weekly office yoga notes, straight to your inbox",
      newsletterDescription:
        "Get one practical stretch sequence, one posture insight, and one gentle reminder to breathe.",
      featuredEyebrow: "Featured Reading",
      featuredTitle: "Support your body through the shape of a workday",
      featuredDescription:
        "From morning resets to gentle desk relief, explore practical guidance for staying calm, mobile, and more comfortable during long hours at work.",
      topicEyebrow: "Browse by Topic",
      topicTitle: "Find the kind of support your workday needs most",
      topicDescription:
        "Whether you need posture help, breathing resets, or quick stretch breaks, these themes make it easier to keep reading with purpose.",
      topicRead: "Explore",
      pathEyebrow: "Workday Paths",
      pathTitle: "Small rituals for steadier energy throughout the day",
      pathCards: [
        {
          title: "Morning Reset",
          description:
            "Start the day with breathing, posture support, and low-friction movement.",
        },
        {
          title: "Desk Relief",
          description:
            "Reduce neck, wrist, shoulder, and lower-back strain during long screen sessions.",
        },
        {
          title: "Remote Wellness",
          description:
            "Support healthier energy, recovery, and rhythm for distributed teams.",
        },
      ],
    },
    blog: {
      eyebrow: "Blog Archive",
      title: "Desk yoga, mobility, and mindful work habits",
      description:
        "Practical articles for busy professionals who want less tension, better posture, and a steadier nervous system at work.",
      pageLabel: "Page",
      previous: "Previous",
      next: "Next",
      filterLabel: "Filter by topic",
      clearFilter: "Clear filter",
      showingTag: "Showing topic",
    },
    about: {
      eyebrow: "About Office Yoga",
      title: "A calmer approach to thriving at work",
      paragraphs: [
        "Office Yoga Blog exists to make workplace wellness feel practical, modern, and sustainable. We share approachable yoga, mobility, and recovery strategies for people who spend much of their day at a desk, in meetings, or moving between digital tasks.",
        "Our editorial lens blends yoga principles with real-world work habits. That means short routines, simple posture support, mindful breathing, and energy management that fit the rhythms of office and remote life.",
        "We write for global professionals, team leads, and wellness-minded companies that want healthier, more focused workdays without adding complexity.",
      ],
      coverageTitle: "What we cover",
      coverageBody:
        "Desk yoga routines, posture resets, mobility breaks, breathing tools, and workplace wellbeing content built for modern schedules.",
      contactTitle: "Contact",
      contactBody:
        "Reach us at hello@officeyoga.blog for partnerships, editorial ideas, or wellness collaborations.",
    },
    privacy: {
      title: "Privacy Policy",
      intro:
        "Office Yoga Blog values your privacy. This policy explains what data we collect, how we use it, and the choices available to you when you browse our website or subscribe to our newsletter.",
      sections: [
        {
          title: "Information We Collect",
          body: "We may collect limited personal information such as your email address when you voluntarily subscribe to our newsletter. We also collect anonymized usage data through analytics tools to understand website performance and improve content.",
        },
        {
          title: "How We Use Information",
          body: "We use collected data to deliver email updates, respond to inquiries, improve site content, monitor traffic trends, and support advertising or sponsorship operations.",
        },
        {
          title: "Cookies and Analytics",
          body: "This site may use cookies or similar technologies for analytics and user experience improvements. You can manage cookies through your browser settings.",
        },
        {
          title: "Third-Party Services",
          body: "We may use third-party tools such as Google Analytics and newsletter providers like ConvertKit or Mailchimp. These providers process data according to their own privacy policies.",
        },
        {
          title: "Your Choices",
          body: "You may unsubscribe from emails at any time using the link included in each newsletter. If you have privacy-related questions, contact us at hello@officeyoga.blog.",
        },
        {
          title: "Updates",
          body: "We may update this policy from time to time. Changes will be posted on this page with an updated effective date when appropriate.",
        },
      ],
    },
  },
  "zh-CN": {
    nav: {
      home: "首页",
      blog: "博客",
      about: "关于",
      privacy: "隐私",
      language: "语言",
      themeSystem: "跟随系统",
      themeLight: "浅色",
      themeDark: "深色",
    },
    footer: {
      rights: "Office Yoga Blog 版权所有。",
      about: "关于",
      privacy: "隐私",
      contact: "联系",
    },
    newsletter: {
      label: "订阅",
      subscribe: "订阅更新",
      placeholder: "输入你的邮箱",
      success: "订阅成功，下一次工作日身心重置很快送达。",
    },
    post: {
      readMore: "阅读全文",
      relatedLabel: "相关文章",
      relatedTitle: "你可能还会喜欢",
      articleEnjoyed: "喜欢这篇文章吗？",
      articleDescription:
        "订阅后可持续收到适合会议间隙使用的温和、实用办公室健康建议。",
      taggedLabel: "标签",
      continueLabel: "继续浏览",
    },
    home: {
      eyebrow: "办公室健康日志",
      title: "用小而轻的瑜伽习惯，换来更平静、更有力的工作日。",
      description:
        "围绕长时间久坐、远程办公与高频用屏场景，提供更科学的拉伸、桌边瑜伽和姿势重置内容。",
      primaryCta: "浏览博客",
      secondaryCta: "加入订阅",
      focuses: [
        "适合下午低能量时段的 10 分钟桌边流动练习",
        "针对颈部、肩膀与手腕的用屏恢复方案",
        "真正适合现代工作节奏的正念姿势习惯",
      ],
      latestEyebrow: "最新文章",
      latestTitle: "为更健康的办公节律准备的新内容",
      viewAll: "查看全部文章",
      newsletterTitle: "每周一封办公室瑜伽简报，直接发送到邮箱",
      newsletterDescription:
        "每周获得一组实用拉伸、一条姿势建议，以及一个提醒自己慢下来呼吸的小提示。",
      featuredEyebrow: "精选导读",
      featuredTitle: "让身体在整个工作日里都得到更温和的支持",
      featuredDescription:
        "从晨间重置到桌边缓解，这里整理了适合久坐、远程办公和高频用屏场景的实用建议。",
      topicEyebrow: "主题入口",
      topicTitle: "按你当下最需要的工作日支持继续阅读",
      topicDescription:
        "无论你更关注姿势、呼吸、拉伸还是恢复，都可以更快找到适合自己的内容。",
      topicRead: "查看",
      pathEyebrow: "工作日路径",
      pathTitle: "用一些小而稳定的习惯照顾整天的状态",
      pathCards: [
        {
          title: "晨间重置",
          description:
            "用呼吸、姿势支持和低门槛活动开启更稳的工作日。",
        },
        {
          title: "桌边缓解",
          description:
            "针对颈部、手腕、肩膀和下背部的高频屏幕劳损问题。",
        },
        {
          title: "远程健康",
          description:
            "为远程团队建立更可持续的能量、恢复与节律。",
        },
      ],
    },
    blog: {
      eyebrow: "博客归档",
      title: "桌边瑜伽、身体活动与专注工作习惯",
      description:
        "为忙碌职场人准备的实用内容，帮助你在工作中减少紧绷、改善姿势，并让神经系统更稳定。",
      pageLabel: "第",
      previous: "上一页",
      next: "下一页",
      filterLabel: "按主题筛选",
      clearFilter: "清除筛选",
      showingTag: "当前主题",
    },
    about: {
      eyebrow: "关于 Office Yoga",
      title: "让工作状态更平静、更可持续",
      paragraphs: [
        "Office Yoga Blog 希望让办公室健康不再停留在口号，而是变成真正可实践、现代且长期可坚持的工作习惯。我们关注那些长时间坐在桌前、频繁开会或持续切换数字任务的人。",
        "我们的编辑视角会把瑜伽原则与真实工作场景结合起来，输出短时练习、姿势支持、呼吸放松和适应现代办公节奏的能量管理内容。",
        "我们为全球职场人、团队负责人和重视健康文化的公司写作，希望帮助他们在不增加额外负担的前提下，获得更健康、更专注的工作日。",
      ],
      coverageTitle: "我们关注什么",
      coverageBody:
        "桌边瑜伽流程、姿势重置、活动间歇、呼吸工具，以及适配现代工作节奏的办公室健康内容。",
      contactTitle: "联系方式",
      contactBody:
        "如果你想聊合作、选题或健康项目，可以发邮件到 hello@officeyoga.blog。",
    },
    privacy: {
      title: "隐私政策",
      intro:
        "Office Yoga Blog 重视你的隐私。本政策说明我们会收集哪些数据、如何使用这些数据，以及你在浏览网站或订阅邮件时拥有的选择权。",
      sections: [
        {
          title: "我们收集的信息",
          body: "当你自愿订阅邮件时，我们可能会收集有限的个人信息，例如邮箱地址。我们也可能通过分析工具收集匿名使用数据，以了解网站表现并改进内容。",
        },
        {
          title: "信息如何被使用",
          body: "我们会使用收集到的数据来发送邮件更新、回复咨询、优化网站内容、分析流量趋势，以及支持广告或赞助相关运营。",
        },
        {
          title: "Cookies 与分析工具",
          body: "本网站可能会使用 Cookies 或类似技术来支持分析与体验优化。你可以通过浏览器设置管理 Cookies。",
        },
        {
          title: "第三方服务",
          body: "我们可能会使用 Google Analytics、ConvertKit 或 Mailchimp 等第三方工具。这些服务商会依据其各自的隐私政策处理数据。",
        },
        {
          title: "你的选择",
          body: "你可以随时通过邮件中的退订链接取消订阅。如果你对隐私相关问题有疑问，请联系 hello@officeyoga.blog。",
        },
        {
          title: "政策更新",
          body: "我们可能会不时更新本政策。若有变更，会在本页面进行发布，并在适当情况下更新生效时间。",
        },
      ],
    },
  },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

// Animations communes pour toute l'application
export const ANIMATION_VARIANTS = {
  // Variants pour les conteneurs
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },

  // Variants pour les éléments
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  },

  // Variants pour les modales
  modal: {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  },

  // Animations de hover communes
  hover: {
    card: { y: -2, scale: 1.01, transition: { duration: 0.2 } },
    button: { scale: 1.02, transition: { duration: 0.2 } },
    icon: { scale: 1.1, transition: { duration: 0.2 } },
    rotate: { rotate: 5, transition: { duration: 0.2 } },
  },

  // Animations de tap communes
  tap: {
    button: { scale: 0.95 },
    card: { scale: 0.99 },
  },

  // Animations de focus
  focus: {
    input: { scale: 1.02, transition: { duration: 0.2 } },
  },

  // Animations de skeleton
  skeleton: {
    loading: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  },

  // Animations de pulsation
  pulse: {
    slow: {
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 },
    },
    medium: {
      scale: [1, 1.1, 1],
      transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 },
    },
    fast: {
      scale: [1, 1.2, 1],
      transition: { duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 },
    },
  },

  // Animations de rotation
  rotate: {
    slow: {
      rotate: [0, 2, -2, 0],
      transition: { duration: 6, repeat: Number.POSITIVE_INFINITY, repeatDelay: 8 },
    },
    medium: {
      rotate: [0, 5, -5, 0],
      transition: { duration: 4, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 },
    },
    fast: {
      rotate: [0, 10, -10, 0],
      transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 },
    },
  },

  // Animations de floating
  float: {
    slow: {
      y: [0, -5, 0],
      transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 },
    },
    medium: {
      y: [0, -10, 0],
      transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 },
    },
  },
}

// Skeletons réutilisables
export const SKELETON_VARIANTS = {
  profile: {
    card: "card bg-base-100 shadow-lg",
    avatar: "skeleton w-32 h-32 rounded-full",
    title: "skeleton h-8 w-48 mb-2",
    subtitle: "skeleton h-6 w-64 mb-4",
    stats: "skeleton h-20 w-full rounded-lg",
  },

  card: {
    container: "card bg-base-100 shadow-md",
    header: "skeleton h-6 w-32",
    content: "skeleton h-4 w-full",
    icon: "skeleton w-5 h-5 rounded",
  },

  list: {
    container: "card bg-base-200 shadow-sm",
    header: "skeleton h-6 w-32 mb-2",
    item: "skeleton h-16 w-full rounded",
    actions: "skeleton h-8 w-16",
  },
}


export const stepVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1, 
    transition: { 
      duration: 0.4, 
      ease: "easeOut" 
    }
  },
  exit: { 
    opacity: 0, 
    x: -50, 
    scale: 0.95, 
    transition: { 
      duration: 0.3, 
      ease: "easeIn" 
    }
  }
};

export const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      staggerChildren: 0.1
    }
  }
};
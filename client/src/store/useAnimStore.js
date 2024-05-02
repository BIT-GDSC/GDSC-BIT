import { create } from 'zustand'

export const useAnimStore = create(set => ({
  toggleDisable: false,

  mobileMenu: false,
  setMobileMenu: verifyState => {
    set({ mobileMenu: verifyState })
    set({ avatarMenu: false })
    set({ toggleDisable: true })
    setTimeout(() => {
      set({ toggleDisable: false })
    }, 400)
  },

  menuPopup: false,
  openMenu: () => {
    set({ avatarPopup: false })
    set({ avatarMenu: false })
    set({ menuPopup: true })
    set({ mobileMenu: true })
  },
  closeMenu: () => {
    set({ toggleDisable: true })
    setTimeout(() => {
      set({ menuPopup: false })
      set({ mobileMenu: false })
      set({ avatarPopup: false })
      set({ avatarMenu: false })
      set({ toggleDisable: false })
    }, 400)
  },

  avatarMenu: false,
  setAvatarMenu: verifyState => {
    set({ avatarMenu: verifyState })
    set({ mobileMenu: false })
  },

  avatarPopup: false,
  openAvatar: () => {
    set({ menuPopup: false })
    set({ mobileMenu: false })
    set({ avatarPopup: true })
    set({ avatarMenu: true })
  },
  closeAvatar: () => {
    setTimeout(() => {
      set({ menuPopup: false })
      set({ mobileMenu: false })
      set({ avatarPopup: false })
      set({ avatarMenu: false })
    }, 400)
  },
}))

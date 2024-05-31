import { create } from 'zustand'

export const useAnimStore = create((set) => ({

  mobileMenu: false,
  setMobileMenu: (verifyState) => {
    set({ mobileMenu: verifyState })
    set({ avatarMenu: false })
  },

  menuPopup: false,
  openMenu: () => {
    set({ avatarPopup: false })
    set({ avatarMenu: false })
    set({ menuPopup: true })
    set({ mobileMenu: true })
  },
  closeMenu: () => {
    set({ menuPopup: false })
    set({ mobileMenu: false })
    set({ avatarPopup: false })
    set({ avatarMenu: false })
  },

  avatarMenu: false,
  setAvatarMenu: (verifyState) => {
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
    set({ menuPopup: false })
    set({ mobileMenu: false })
    set({ avatarPopup: false })
    set({ avatarMenu: false })
  },
}))

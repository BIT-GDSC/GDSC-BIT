import { create } from 'zustand'

export const useAnimStore = create(set => ({
  toggleDisable: false,
  
  mobileMenu: false,
  setMobileMenu: verifyState => {
    set({ mobileMenu: verifyState })
    set({ toggleDisable: true })
    setTimeout(() => {
      set({ toggleDisable: false })
    }, 1000)
  },

  menuPopup: false,
  openMenu: () => {
    set({ menuPopup: true })
    set({ mobileMenu: true })
  },
  closeMenu: () => {
    set({ toggleDisable: true })
    setTimeout(() => {
      set({ menuPopup: false })
      set({ mobileMenu: false })
      set({ toggleDisable: false })
    }, 1000)
  }
}))

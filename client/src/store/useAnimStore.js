import { create } from 'zustand'
import { toast } from 'sonner'

export const useAnimStore = create(set => ({
  mobileMenu: false,
  menuPopup: false,
  toggleDisable: false,
  setMobileMenu: verifyState => {
    set({ mobileMenu: verifyState })
    set({ toggleDisable: true })
    setTimeout(() => {
      set({ toggleDisable: false })
    }, 1000)
  },
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

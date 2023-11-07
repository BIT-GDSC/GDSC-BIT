import { create } from 'zustand'
import { toast } from 'sonner'

export const useAnimStore = create(set => ({
  mobileMenu: false,
  setMobileMenu: verifyState => {
    set({ mobileMenu: verifyState })
  },
}))

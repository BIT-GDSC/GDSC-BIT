import { create } from 'zustand'
import { toast } from 'sonner'

export const useAnimStore = create(set => ({
  mobileMenu: false,
  setMobileMenu: verifyState => {
    if (verifyState) {
        console.log("in store", verifyState)
    //   toast.success('hello')
    }
    set({ MobileMenu: verifyState })
  }
}))

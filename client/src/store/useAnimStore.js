import { create } from 'zustand'

export const useAnimStore = create(set => ({
  mobileMenu: false,
  avatarMenu: false,
  setMobileMenu: verifyState => set({ mobileMenu: verifyState }),
  setAvatarMenu: state=>set({avatarMenu: state}),
}))

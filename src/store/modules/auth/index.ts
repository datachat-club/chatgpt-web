import { defineStore } from 'pinia'
import { getToken, removeToken, setToken } from './helper'
import { store } from '@/store'
import { fetchSession } from '@/api'

interface SessionResponse {
  auth: boolean
  model: 'ChatGPTAPI' | 'ChatGPTUnofficialProxyAPI',

}

export interface AuthState {
  token: string | undefined
  session: SessionResponse | null
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    token: getToken(),
    session: null,
  }),

  getters: {
    isChatGPTAPI(state): boolean {
      return state.session?.model === 'ChatGPTAPI'
    },
  },

  actions: {
    async getSession(form: { phoneNumber: string | null; password: string | null; checkPassword?: string | null | undefined }) {
      try {
        const { status, data } = await fetchSession<SessionResponse>(form)

        if (status === 'Success') {
          this.session = { ...data }
          localStorage.setItem('pp-token', data.token)
          return Promise.resolve(true)
        } else {

          return Promise.resolve(false)
        }


      }
      catch (error) {
        return Promise.resolve(false)
      }
    },

    setToken(token: string) {

      this.token = token
      setToken(token)
    },

    removeToken() {
      this.token = undefined
      removeToken()
    },
  },
})

export function useAuthStoreWithout() {
  return useAuthStore(store)
}

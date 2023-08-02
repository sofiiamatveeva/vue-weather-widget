import { InjectionKey } from "vue";
import { Store, createStore } from "vuex";

interface State {
  citiesList: string[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store: Store<State> = createStore<State>({
  state() {
    return {
      citiesList: [],
    };
  },
  mutations: {
    addCity(state: State, newCity: string): void {
      state.citiesList.push(newCity);

      store.commit("saveToLocalStorage");
    },
    deleteCity(state: State, cityToDelete: string): void {
      state.citiesList = state.citiesList.filter((city) => {
        return city !== cityToDelete;
      });

      store.commit("saveToLocalStorage");
    },
    saveToLocalStorage(state: State): void {
      localStorage.setItem("citiesList", JSON.stringify(state.citiesList));
    },
  },
});

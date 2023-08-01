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
    addCity(state: State, newCity: string) {
      state.citiesList.push(newCity);
    },
    deleteCity(state: State, cityToDelete: string) {
      state.citiesList = state.citiesList.filter((city) => {
        return city !== cityToDelete;
      });
    },
  },
});

import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
  reaction,
} from "mobx";
import User from "../interfaces/user.interface";

class UsersStore {
  public users: User[] = [];

  public rowsCount = 1000000;
  public pageNumber = 1;
  public pageSize = 20;

  public get pageCount() {
    return this.rowsCount / this.pageSize;
  }

  constructor() {
    makeObservable(this, {
      users: observable,
      pageNumber: observable,
      pageSize: observable,
      rowsCount: observable,
      pageCount: computed,
      getUsers: action,
    });
    this.getUsers();

    reaction(
      () => [this.pageNumber, this.pageSize],
      () => this.getUsers()
    );
  }

  public async getUsers(): Promise<void> {
    try {
      const res = await fetch(
        `https://randomuser.me/api/?page=${this.pageNumber}&results=${
          this.pageSize
        }&seed=abc`
      );
      const data = await res.json();
      runInAction(
        () =>
          (this.users = data.results.map((user: any) => ({
            id: user.login.uuid,
            firstName: user.name.first,
            lastName: user.name.last,
            username: user.login.username,
            email: user.email,
            gender: user.gender,
          })))
      );
    } catch (error) {
      console.error(error);
    }
  }
}

const usersStore = new UsersStore();

export default usersStore;

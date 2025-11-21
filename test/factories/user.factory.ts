type PostUser = {
  name: string;
  email: string;
};

const generateUser = () => {
  const name = Math.random().toString(32).substring(2);
  return { name, email: `${name}@example.com` };
};

export class UserFactory {
  value: PostUser;
  constructor(value?: any) {
    this.value = { ...generateUser(), ...value };
  }
  build() {
    return this.value;
  }
}

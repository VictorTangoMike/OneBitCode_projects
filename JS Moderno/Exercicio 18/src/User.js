class User {
  constructor(fullName, email, password) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.logged = false;
  }

  login(email, password) {
    if (this.email === email && this.password === password) {
      console.log("Login efetuado com sucesso!");
      this.logged = true;
    } else {
      console.log("Email ou senha inválidos!");
      this.logged = false;
    }
  }
}

module.exports = User;
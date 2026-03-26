// --- Temel Class ---
class Animal {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  introduce(): string {
    return `Ben ${this.name}, ${this.age} yaşındayım.`;
  }
}

const cat = new Animal("Minnoş", 3);
console.log(cat.introduce());


// --- Access Modifiers ---
class BankAccount {
  public owner: string;
  private balance: number;
  protected accountNo: string;

  constructor(owner: string, initialBalance: number) {
    this.owner = owner;
    this.balance = initialBalance;
    this.accountNo = Math.random().toString(36).slice(2);
  }

  deposit(amount: number): void { this.balance += amount; }
  showBalance(): number { return this.balance; }
}

const account = new BankAccount("Ahmet", 1000);
account.deposit(500);
console.log(account.showBalance()); // 1500
// console.log(account.balance);       // 🔴 hata — private


// --- Constructor Shorthand ---
class Car {
  constructor(
    public brand: string,
    public model: string,
    private km: number = 0,
  ) {}

  drive(distance: number): void { this.km += distance; }
  showMileage(): number { return this.km; }
}

const car = new Car("Toyota", "Corolla");
car.drive(150);
console.log(car.showMileage()); // 150


// --- Inheritance ---
class Shape {
  constructor(public color: string) {}
  area(): number { return 0; }
}

class Circle extends Shape {
  constructor(color: string, private radius: number) {
    super(color);
  }
  area(): number { return Math.PI * this.radius ** 2; }
}

const circle = new Circle("kırmızı", 5);
console.log(circle.area());  // 78.53...
console.log(circle.color);    // "kırmızı"


// --- Interface implements ---
interface CanMakeSound {
  makeSound(): string;
}

interface CanMove {
  move(direction: string): void;
}

class Dog extends Animal implements CanMakeSound, CanMove {
  makeSound(): string { return "Hav hav!"; }
  move(direction: string): void { console.log(`${this.name} ${direction} yönüne koşuyor.`); }
}

const dog = new Dog("Karabaş", 4);
console.log(dog.makeSound());
dog.move("kuzey");

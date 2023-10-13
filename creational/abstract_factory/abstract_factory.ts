// interfejs fabryki abstrakcyjnej: deklaracja metod zwracajacych rozne produkty, ktore sa powiazane tematycznie - zwykle sa zdolne do wspolpracy miedy soba
interface MobileInterfaceFactory {
  createButton(): Button;

  createCheckbox(): Checkbox;
}
// konretne fabryki tworza produkty nalezace do danego wariantu tematycznego
// fabryka konkretna gwarantuje, ze produkty, ktore tworzy sa zgodne ze soba
class AndroidFactory implements MobileInterfaceFactory {
  public createButton(): Button {
    return new AndroidButton();
  }
  public createCheckbox(): Checkbox {
    return new AndroidCheckbox();
  }
}

class IOSFactory implements MobileInterfaceFactory {
  public createButton(): Button {
    return new IOSButton();
  }
  public createCheckbox(): Checkbox {
    return new IOSCheckbox();
  }
}

interface Button {
  name: string;
  defaultMethod(): string;
}

class AndroidButton implements Button {
  // implementacja specificzna dla androida
  public name: string = "AndroidButton";
  public defaultMethod(): string {
    return "AndroidButton";
  }
}

class IOSButton implements Button {
  // implementacja specificzna dla ios
  public name: string = "IOSButton";
  public defaultMethod(): string {
    return "IOSButton";
  }
}

interface Checkbox {
  name: string;
  defaultMethod(): string;
  customMethod(collaborator: Button): string;
}

class AndroidCheckbox implements Checkbox {
  // implementacja specificzna dla androida
  public name: string = "AndroidCheckbox";
  public defaultMethod(): string {
    return "AndroidCheckbox";
  }

  public customMethod(collaborator: Button): string {
    const result = collaborator.defaultMethod();
    return `The result of the AndroidCheckbox collaborating with the (${result})`;
  }
}

class IOSCheckbox implements Checkbox {
  // implementacja specificzna dla ios
  public name: string = "IOSCheckbox";
  public defaultMethod(): string {
    return "IOSCheckbox";
  }

  public customMethod(collaborator: Button): string {
    const result = collaborator.defaultMethod();
    return `The result of the B2 collaborating with the (${result})`;
  }
}

function clientCode(factory: MobileInterfaceFactory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();

  console.log(checkbox.defaultMethod());
  console.log(checkbox.customMethod(button));
}

console.log("Android platform");
clientCode(new AndroidFactory());

console.log("IOS platform");
clientCode(new IOSFactory());

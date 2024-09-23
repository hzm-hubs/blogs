extends关键字用于类声明或者类表达式中，以创建一个类，该类是另一个类的子类。 继承的.prototype必须是一个Object 或者 null。

语法 class ChildClass extends ParentClass { ... } // 根据父类创建子类，子类会继承父类

```js
class Square extends SquareParents {
    constructor(length) {
        super(length,length);
        this.name = 'hzm'
    }
    get area() {
        return this.height * this.width
    }
    
}
```
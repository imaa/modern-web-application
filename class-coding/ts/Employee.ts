@Annotated({ name: "id", value: 0 })
export class Employee {

    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }

}

var emp = new Employee();
emp.constructor.prototype.age = 12;

for (const key in emp) {
    console.log(key);
}

function Annotated(props: any) {
    return function (constructor: Function) {
        constructor.prototype[props.name] = props.value;
    }
}
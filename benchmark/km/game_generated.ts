
import * as karmem from '../../assemblyscript/karmem'

let _Null = new StaticArray<u8>(152)

export type Color = u8;
export const ColorRed : Color = 0
export const ColorGreen : Color = 1
export const ColorBlue : Color = 2

export type Team = u8;
export const TeamHumans : Team = 0
export const TeamOrcs : Team = 1
export const TeamZombies : Team = 2
export const TeamRobots : Team = 3
export const TeamAliens : Team = 4


export class Vec3 {
    X: f32;
    Y: f32;
    Z: f32;

    static Reset(x: Vec3): void {
        x.X = 0;
        x.Y = 0;
        x.Z = 0;
    }

    @inline
    static WriteAsRoot(x: Vec3, writer: karmem.Writer): void {
        this.Write(x, writer, 0);
    }

    static Write(x: Vec3, writer: karmem.Writer, start: u32): boolean {
        let offset = start;
        const size: u32 = 16;
        if (offset == 0) {
            offset = writer.Alloc(size);
            if (offset == 0xFFFFFFFF) {
                return false;
            }
        }
        let __XOffset: u32 = offset + 0;
        writer.WriteAt<f32>(__XOffset, x.X);
        let __YOffset: u32 = offset + 4;
        writer.WriteAt<f32>(__YOffset, x.Y);
        let __ZOffset: u32 = offset + 8;
        writer.WriteAt<f32>(__ZOffset, x.Z);

        return true
    }

    @inline
    static ReadAsRoot(x: Vec3, reader: karmem.Reader) : void {
        this.Read(x, NewVec3Viewer(reader, 0), reader);
    }

    @inline
    static Read(x: Vec3, viewer: Vec3Viewer, reader: karmem.Reader) : void {
    x.X = viewer.X();
    x.Y = viewer.Y();
    x.Z = viewer.Z();
    }

}

export function NewVec3(): Vec3 {
    let x: Vec3 = {
    X: 0,
    Y: 0,
    Z: 0,
    }
    return x;
}

export class WeaponData {
    Damage: i32;
    Range: i32;

    static Reset(x: WeaponData): void {
        x.Damage = 0;
        x.Range = 0;
    }

    @inline
    static WriteAsRoot(x: WeaponData, writer: karmem.Writer): void {
        this.Write(x, writer, 0);
    }

    static Write(x: WeaponData, writer: karmem.Writer, start: u32): boolean {
        let offset = start;
        const size: u32 = 16;
        if (offset == 0) {
            offset = writer.Alloc(size);
            if (offset == 0xFFFFFFFF) {
                return false;
            }
        }
        writer.WriteAt<u32>(offset, size);
        let __DamageOffset: u32 = offset + 4;
        writer.WriteAt<i32>(__DamageOffset, x.Damage);
        let __RangeOffset: u32 = offset + 8;
        writer.WriteAt<i32>(__RangeOffset, x.Range);

        return true
    }

    @inline
    static ReadAsRoot(x: WeaponData, reader: karmem.Reader) : void {
        this.Read(x, NewWeaponDataViewer(reader, 0), reader);
    }

    @inline
    static Read(x: WeaponData, viewer: WeaponDataViewer, reader: karmem.Reader) : void {
    x.Damage = viewer.Damage();
    x.Range = viewer.Range();
    }

}

export function NewWeaponData(): WeaponData {
    let x: WeaponData = {
    Damage: 0,
    Range: 0,
    }
    return x;
}

export class Weapon {
    Data: WeaponData;

    static Reset(x: Weapon): void {
        WeaponData.Reset(x.Data);
    }

    @inline
    static WriteAsRoot(x: Weapon, writer: karmem.Writer): void {
        this.Write(x, writer, 0);
    }

    static Write(x: Weapon, writer: karmem.Writer, start: u32): boolean {
        let offset = start;
        const size: u32 = 8;
        if (offset == 0) {
            offset = writer.Alloc(size);
            if (offset == 0xFFFFFFFF) {
                return false;
            }
        }
        const __DataSize: u32 = 16;
        let __DataOffset = writer.Alloc(__DataSize);
        if (__DataOffset == 0) {
            return false;
        }
        writer.WriteAt<u32>(offset +0, __DataOffset);
        if (!WeaponData.Write(x.Data, writer, __DataOffset)) {
            return false;
        }

        return true
    }

    @inline
    static ReadAsRoot(x: Weapon, reader: karmem.Reader) : void {
        this.Read(x, NewWeaponViewer(reader, 0), reader);
    }

    @inline
    static Read(x: Weapon, viewer: WeaponViewer, reader: karmem.Reader) : void {
    WeaponData.Read(x.Data, viewer.Data(reader), reader);
    }

}

export function NewWeapon(): Weapon {
    let x: Weapon = {
    Data: NewWeaponData(),
    }
    return x;
}

export class MonsterData {
    Pos: Vec3;
    Mana: i16;
    Health: i16;
    Name: string;
    Team: Team;
    Inventory: Array<u8>;
    Color: Color;
    Hitbox: StaticArray<f64>;
    Status: Array<i32>;
    Weapons: StaticArray<Weapon>;
    Path: Array<Vec3>;

    static Reset(x: MonsterData): void {
        Vec3.Reset(x.Pos);
        x.Mana = 0;
        x.Health = 0;
        x.Name = ""
        x.Team = 0;
        x.Inventory.length = 0;
        x.Color = 0;
        let __HitboxLen = x.Hitbox.length;
        for (let i = 0; i < __HitboxLen; i++) {
            x.Hitbox[i] = 0;
        }
        x.Status.length = 0;
        let __WeaponsLen = x.Weapons.length;
        for (let i = 0; i < __WeaponsLen; i++) {
            Weapon.Reset(x.Weapons[i]);
        }
        let __PathLen = x.Path.length;
        for (let i = 0; i < __PathLen; i++) {
            Vec3.Reset(x.Path[i]);
        }
        x.Path.length = 0;
    }

    @inline
    static WriteAsRoot(x: MonsterData, writer: karmem.Writer): void {
        this.Write(x, writer, 0);
    }

    static Write(x: MonsterData, writer: karmem.Writer, start: u32): boolean {
        let offset = start;
        const size: u32 = 152;
        if (offset == 0) {
            offset = writer.Alloc(size);
            if (offset == 0xFFFFFFFF) {
                return false;
            }
        }
        writer.WriteAt<u32>(offset, size);
        let __PosOffset: u32 = offset + 4;
        if (!Vec3.Write(x.Pos, writer, __PosOffset)) {
            return false;
        }
        let __ManaOffset: u32 = offset + 20;
        writer.WriteAt<i16>(__ManaOffset, x.Mana);
        let __HealthOffset: u32 = offset + 22;
        writer.WriteAt<i16>(__HealthOffset, x.Health);
        const __NameString : Uint8Array = Uint8Array.wrap(String.UTF8.encode(x.Name, false))
        const __NameSize: u32 = 1 * __NameString.length;
        let __NameOffset = writer.Alloc(__NameSize);
        if (__NameOffset == 0) {
            return false;
        }
        writer.WriteAt<u32>(offset +24, __NameOffset);
        writer.WriteAt<u32>(offset +24 +4, __NameSize);
        writer.WriteAt<u32>(offset + 24 + 4 + 4, 1)
        writer.WriteSliceAt<Uint8Array>(__NameOffset, __NameString);
        let __TeamOffset: u32 = offset + 36;
        writer.WriteAt<u8>(__TeamOffset, u8(x.Team));
        const __InventorySize: u32 = 1 * x.Inventory.length;
        let __InventoryOffset = writer.Alloc(__InventorySize);
        if (__InventoryOffset == 0) {
            return false;
        }
        writer.WriteAt<u32>(offset +37, __InventoryOffset);
        writer.WriteAt<u32>(offset +37 +4, __InventorySize);
        writer.WriteAt<u32>(offset + 37 + 4 + 4, 1)
        writer.WriteSliceAt<Array<u8>>(__InventoryOffset, x.Inventory);
        let __ColorOffset: u32 = offset + 49;
        writer.WriteAt<u8>(__ColorOffset, u8(x.Color));
        let __HitboxOffset: u32 = offset + 50;
        writer.WriteArrayAt<StaticArray<f64>>(__HitboxOffset, x.Hitbox);
        const __StatusSize: u32 = 4 * x.Status.length;
        let __StatusOffset = writer.Alloc(__StatusSize);
        if (__StatusOffset == 0) {
            return false;
        }
        writer.WriteAt<u32>(offset +90, __StatusOffset);
        writer.WriteAt<u32>(offset +90 +4, __StatusSize);
        writer.WriteAt<u32>(offset + 90 + 4 + 4, 4)
        writer.WriteSliceAt<Array<i32>>(__StatusOffset, x.Status);
        let __WeaponsOffset: u32 = offset + 102;
        let __WeaponsLen = x.Weapons.length;
        for (let i = 0; i < __WeaponsLen; i++) {
            if (!Weapon.Write(x.Weapons[i], writer, __WeaponsOffset)) {
                return false;
            }
            __WeaponsOffset += 8;
        }
        const __PathSize: u32 = 16 * x.Path.length;
        let __PathOffset = writer.Alloc(__PathSize);
        if (__PathOffset == 0) {
            return false;
        }
        writer.WriteAt<u32>(offset +134, __PathOffset);
        writer.WriteAt<u32>(offset +134 +4, __PathSize);
        writer.WriteAt<u32>(offset + 134 + 4 + 4, 16)
        let __PathLen = x.Path.length;
        for (let i = 0; i < __PathLen; i++) {
            if (!Vec3.Write(x.Path[i], writer, __PathOffset)) {
                return false;
            }
            __PathOffset += 16;
        }

        return true
    }

    @inline
    static ReadAsRoot(x: MonsterData, reader: karmem.Reader) : void {
        this.Read(x, NewMonsterDataViewer(reader, 0), reader);
    }

    @inline
    static Read(x: MonsterData, viewer: MonsterDataViewer, reader: karmem.Reader) : void {
    Vec3.Read(x.Pos, viewer.Pos(), reader);
    x.Mana = viewer.Mana();
    x.Health = viewer.Health();
    x.Name = viewer.Name(reader);
    x.Team = <Team>viewer.Team();
    let __InventorySlice = viewer.Inventory(reader);
    let __InventoryLen = __InventorySlice.length;
    let __InventoryDestLen = x.Inventory.length;
    if (__InventoryLen > __InventoryDestLen) {
        x.Inventory.length = __InventoryLen
        x.Inventory.length = __InventoryDestLen
        for (let i = __InventoryDestLen; i < __InventoryLen; i++) {
            x.Inventory.push(0);
        }
    }
    for (let i = 0; i < x.Inventory.length; i++) {
        if (i >= __InventoryLen) {
            x.Inventory[i] = 0;
        } else {
            x.Inventory[i] = __InventorySlice[i];
        }
    }
    x.Inventory.length = __InventoryLen;
    x.Color = <Color>viewer.Color();
    let __HitboxSlice = viewer.Hitbox();
    let __HitboxLen = __HitboxSlice.length;
    for (let i = x.Hitbox.length; i < __HitboxLen; i++) {
        x.Hitbox[i] = 0;
    }
    for (let i = 0; i < x.Hitbox.length; i++) {
        if (i >= __HitboxLen) {
            x.Hitbox[i] = 0;
        } else {
            x.Hitbox[i] = __HitboxSlice[i];
        }
    }
    let __StatusSlice = viewer.Status(reader);
    let __StatusLen = __StatusSlice.length;
    let __StatusDestLen = x.Status.length;
    if (__StatusLen > __StatusDestLen) {
        x.Status.length = __StatusLen
        x.Status.length = __StatusDestLen
        for (let i = __StatusDestLen; i < __StatusLen; i++) {
            x.Status.push(0);
        }
    }
    for (let i = 0; i < x.Status.length; i++) {
        if (i >= __StatusLen) {
            x.Status[i] = 0;
        } else {
            x.Status[i] = __StatusSlice[i];
        }
    }
    x.Status.length = __StatusLen;
    let __WeaponsSlice = viewer.Weapons();
    let __WeaponsLen = __WeaponsSlice.length;
    for (let i = x.Weapons.length; i < __WeaponsLen; i++) {
        x.Weapons[i] = NewWeapon();
    }
    for (let i = 0; i < x.Weapons.length; i++) {
        if (i >= __WeaponsLen) {
            Weapon.Reset(x.Weapons[i]);
        } else {
            Weapon.Read(x.Weapons[i], __WeaponsSlice[i], reader);
        }
    }
    let __PathSlice = viewer.Path(reader);
    let __PathLen = __PathSlice.length;
    let __PathDestLen = x.Path.length;
    if (__PathLen > __PathDestLen) {
        x.Path.length = __PathLen
        x.Path.length = __PathDestLen
        for (let i = __PathDestLen; i < __PathLen; i++) {
            x.Path.push(NewVec3());
        }
    }
    for (let i = 0; i < x.Path.length; i++) {
        if (i >= __PathLen) {
            Vec3.Reset(x.Path[i]);
        } else {
            Vec3.Read(x.Path[i], __PathSlice[i], reader);
        }
    }
    x.Path.length = __PathLen;
    }

}

export function NewMonsterData(): MonsterData {
    let x: MonsterData = {
    Pos: NewVec3(),
    Mana: 0,
    Health: 0,
    Name: "",
    Team: 0,
    Inventory: new Array<u8>(0),
    Color: 0,
    Hitbox: new StaticArray<f64>(5),
    Status: new Array<i32>(0),
    Weapons: new StaticArray<Weapon>(4),
    Path: new Array<Vec3>(0),
    }
    for (let i = 0; i < x.Hitbox.length; i++) {
        x.Hitbox[i] = 0;
    }
    for (let i = 0; i < x.Weapons.length; i++) {
        x.Weapons[i] = NewWeapon();
    }
    return x;
}

export class Monster {
    Data: MonsterData;

    static Reset(x: Monster): void {
        MonsterData.Reset(x.Data);
    }

    @inline
    static WriteAsRoot(x: Monster, writer: karmem.Writer): void {
        this.Write(x, writer, 0);
    }

    static Write(x: Monster, writer: karmem.Writer, start: u32): boolean {
        let offset = start;
        const size: u32 = 8;
        if (offset == 0) {
            offset = writer.Alloc(size);
            if (offset == 0xFFFFFFFF) {
                return false;
            }
        }
        const __DataSize: u32 = 152;
        let __DataOffset = writer.Alloc(__DataSize);
        if (__DataOffset == 0) {
            return false;
        }
        writer.WriteAt<u32>(offset +0, __DataOffset);
        if (!MonsterData.Write(x.Data, writer, __DataOffset)) {
            return false;
        }

        return true
    }

    @inline
    static ReadAsRoot(x: Monster, reader: karmem.Reader) : void {
        this.Read(x, NewMonsterViewer(reader, 0), reader);
    }

    @inline
    static Read(x: Monster, viewer: MonsterViewer, reader: karmem.Reader) : void {
    MonsterData.Read(x.Data, viewer.Data(reader), reader);
    }

}

export function NewMonster(): Monster {
    let x: Monster = {
    Data: NewMonsterData(),
    }
    return x;
}

export class Monsters {
    Monsters: Array<Monster>;

    static Reset(x: Monsters): void {
        let __MonstersLen = x.Monsters.length;
        for (let i = 0; i < __MonstersLen; i++) {
            Monster.Reset(x.Monsters[i]);
        }
        x.Monsters.length = 0;
    }

    @inline
    static WriteAsRoot(x: Monsters, writer: karmem.Writer): void {
        this.Write(x, writer, 0);
    }

    static Write(x: Monsters, writer: karmem.Writer, start: u32): boolean {
        let offset = start;
        const size: u32 = 24;
        if (offset == 0) {
            offset = writer.Alloc(size);
            if (offset == 0xFFFFFFFF) {
                return false;
            }
        }
        writer.WriteAt<u32>(offset, size);
        const __MonstersSize: u32 = 8 * x.Monsters.length;
        let __MonstersOffset = writer.Alloc(__MonstersSize);
        if (__MonstersOffset == 0) {
            return false;
        }
        writer.WriteAt<u32>(offset +4, __MonstersOffset);
        writer.WriteAt<u32>(offset +4 +4, __MonstersSize);
        writer.WriteAt<u32>(offset + 4 + 4 + 4, 8)
        let __MonstersLen = x.Monsters.length;
        for (let i = 0; i < __MonstersLen; i++) {
            if (!Monster.Write(x.Monsters[i], writer, __MonstersOffset)) {
                return false;
            }
            __MonstersOffset += 8;
        }

        return true
    }

    @inline
    static ReadAsRoot(x: Monsters, reader: karmem.Reader) : void {
        this.Read(x, NewMonstersViewer(reader, 0), reader);
    }

    @inline
    static Read(x: Monsters, viewer: MonstersViewer, reader: karmem.Reader) : void {
    let __MonstersSlice = viewer.Monsters(reader);
    let __MonstersLen = __MonstersSlice.length;
    let __MonstersDestLen = x.Monsters.length;
    if (__MonstersLen > __MonstersDestLen) {
        x.Monsters.length = __MonstersLen
        x.Monsters.length = __MonstersDestLen
        for (let i = __MonstersDestLen; i < __MonstersLen; i++) {
            x.Monsters.push(NewMonster());
        }
    }
    for (let i = 0; i < x.Monsters.length; i++) {
        if (i >= __MonstersLen) {
            Monster.Reset(x.Monsters[i]);
        } else {
            Monster.Read(x.Monsters[i], __MonstersSlice[i], reader);
        }
    }
    x.Monsters.length = __MonstersLen;
    }

}

export function NewMonsters(): Monsters {
    let x: Monsters = {
    Monsters: new Array<Monster>(0),
    }
    return x;
}

@unmanaged
export class Vec3Viewer {
    private _0: u64;
    private _1: u64;

    @inline
    SizeOf(): u32 {
        return 16;
    }
    @inline
    X(): f32 {
        return load<f32>(changetype<usize>(this) + 0);
    }
    @inline
    Y(): f32 {
        return load<f32>(changetype<usize>(this) + 4);
    }
    @inline
    Z(): f32 {
        return load<f32>(changetype<usize>(this) + 8);
    }
}

@inline export function NewVec3Viewer(reader: karmem.Reader, offset: u32): Vec3Viewer {
    if (!reader.IsValidOffset(offset, 16)) {
        return _NullVec3Viewer
    }

    let v: Vec3Viewer = changetype<Vec3Viewer>(reader.Pointer + offset)
    return v
}

let _NullVec3Viewer = changetype<Vec3Viewer>(changetype<usize>(_Null))
@unmanaged
export class WeaponDataViewer {
    private _0: u64;
    private _1: u64;

    @inline
    SizeOf(): u32 {
        return load<u32>(changetype<usize>(this));
    }
    @inline
    Damage(): i32 {
        if ((<u32>4 + <u32>4) > this.SizeOf()) {
            return 0
        }
        return load<i32>(changetype<usize>(this) + 4);
    }
    @inline
    Range(): i32 {
        if ((<u32>8 + <u32>4) > this.SizeOf()) {
            return 0
        }
        return load<i32>(changetype<usize>(this) + 8);
    }
}

@inline export function NewWeaponDataViewer(reader: karmem.Reader, offset: u32): WeaponDataViewer {
    if (!reader.IsValidOffset(offset, 8)) {
        return _NullWeaponDataViewer
    }

    let v: WeaponDataViewer = changetype<WeaponDataViewer>(reader.Pointer + offset)
    if (!reader.IsValidOffset(offset, v.SizeOf())) {
        return _NullWeaponDataViewer
    }
    return v
}

let _NullWeaponDataViewer = changetype<WeaponDataViewer>(changetype<usize>(_Null))
@unmanaged
export class WeaponViewer {
    private _0: u64;

    @inline
    SizeOf(): u32 {
        return 8;
    }
    @inline
    Data(reader: karmem.Reader): WeaponDataViewer {
        let offset: u32 = load<u32>(changetype<usize>(this) + 0);
        if (!reader.IsValidOffset(offset, 16)) {
            return _NullWeaponDataViewer
        }
        let v: WeaponDataViewer = changetype<WeaponDataViewer>(reader.Pointer + offset);
        if (!reader.IsValidOffset(offset, v.SizeOf())) {
            return _NullWeaponDataViewer
        }
        return v
    }
}

@inline export function NewWeaponViewer(reader: karmem.Reader, offset: u32): WeaponViewer {
    if (!reader.IsValidOffset(offset, 8)) {
        return _NullWeaponViewer
    }

    let v: WeaponViewer = changetype<WeaponViewer>(reader.Pointer + offset)
    return v
}

let _NullWeaponViewer = changetype<WeaponViewer>(changetype<usize>(_Null))
@unmanaged
export class MonsterDataViewer {
    private _0: u64;
    private _1: u64;
    private _2: u64;
    private _3: u64;
    private _4: u64;
    private _5: u64;
    private _6: u64;
    private _7: u64;
    private _8: u64;
    private _9: u64;
    private _10: u64;
    private _11: u64;
    private _12: u64;
    private _13: u64;
    private _14: u64;
    private _15: u64;
    private _16: u64;
    private _17: u64;
    private _18: u64;

    @inline
    SizeOf(): u32 {
        return load<u32>(changetype<usize>(this));
    }
    @inline
    Pos(): Vec3Viewer {
        if ((<u32>4 + <u32>16) > this.SizeOf()) {
            return _NullVec3Viewer;
        }
        return changetype<Vec3Viewer>(changetype<usize>(this) + 4);
    }
    @inline
    Mana(): i16 {
        if ((<u32>20 + <u32>2) > this.SizeOf()) {
            return 0
        }
        return load<i16>(changetype<usize>(this) + 20);
    }
    @inline
    Health(): i16 {
        if ((<u32>22 + <u32>2) > this.SizeOf()) {
            return 0
        }
        return load<i16>(changetype<usize>(this) + 22);
    }
    @inline
    Name(reader: karmem.Reader): string {
        if ((<u32>24 + <u32>12) > this.SizeOf()) {
            return ""
        }
        let offset: u32 = load<u32>(changetype<usize>(this) + 24);
        let size: u32 = load<u32>(changetype<usize>(this) + 24 +4);
        if (!reader.IsValidOffset(offset, size)) {
            return "";
        }
        return String.UTF8.decodeUnsafe(reader.Pointer + offset, size, false);
    }
    @inline
    Team(): Team {
        if ((<u32>36 + <u32>1) > this.SizeOf()) {
            return 0
        }
        return load<Team>(changetype<usize>(this) + 36);
    }
    @inline
    Inventory(reader: karmem.Reader): karmem.Slice<u8> {
        if ((<u32>37 + <u32>12) > this.SizeOf()) {
            return new karmem.Slice<u8>(0,0,0)
        }
        let offset: u32 = load<u32>(changetype<usize>(this) + 37);
        let size: u32 = load<u32>(changetype<usize>(this) + 37 +4);
        if (!reader.IsValidOffset(offset, size)) {
            return new karmem.Slice<u8>(0, 0, 0);
        }
        let length = size / 1;
        if (length > 128) {
            length = 128;
        }
        return new karmem.Slice<u8>(reader.Pointer + offset, length, 1);
    }
    @inline
    Color(): Color {
        if ((<u32>49 + <u32>1) > this.SizeOf()) {
            return 0
        }
        return load<Color>(changetype<usize>(this) + 49);
    }
    @inline
    Hitbox(): karmem.Slice<f64> {
        if ((<u32>50 + <u32>40) > this.SizeOf()) {
            return new karmem.Slice<f64>(0,0,0)
        }
        return new karmem.Slice<f64>(changetype<usize>(this) + 50, 5, 8);
    }
    @inline
    Status(reader: karmem.Reader): karmem.Slice<i32> {
        if ((<u32>90 + <u32>12) > this.SizeOf()) {
            return new karmem.Slice<i32>(0,0,0)
        }
        let offset: u32 = load<u32>(changetype<usize>(this) + 90);
        let size: u32 = load<u32>(changetype<usize>(this) + 90 +4);
        if (!reader.IsValidOffset(offset, size)) {
            return new karmem.Slice<i32>(0, 0, 0);
        }
        let length = size / 4;
        if (length > 10) {
            length = 10;
        }
        return new karmem.Slice<i32>(reader.Pointer + offset, length, 4);
    }
    @inline
    Weapons(): karmem.Slice<WeaponViewer> {
        if ((<u32>102 + <u32>32) > this.SizeOf()) {
            return new karmem.Slice<WeaponViewer>(0,0,0)
        }
        return new karmem.Slice<WeaponViewer>(changetype<usize>(this) + 102, 4, 8);
    }
    @inline
    Path(reader: karmem.Reader): karmem.Slice<Vec3Viewer> {
        if ((<u32>134 + <u32>12) > this.SizeOf()) {
            return new karmem.Slice<Vec3Viewer>(0,0,0)
        }
        let offset: u32 = load<u32>(changetype<usize>(this) + 134);
        let size: u32 = load<u32>(changetype<usize>(this) + 134 +4);
        if (!reader.IsValidOffset(offset, size)) {
            return new karmem.Slice<Vec3Viewer>(0, 0, 0);
        }
        let length = size / 16;
        if (length > 2000) {
            length = 2000;
        }
        return new karmem.Slice<Vec3Viewer>(reader.Pointer + offset, length, 16);
    }
}

@inline export function NewMonsterDataViewer(reader: karmem.Reader, offset: u32): MonsterDataViewer {
    if (!reader.IsValidOffset(offset, 8)) {
        return _NullMonsterDataViewer
    }

    let v: MonsterDataViewer = changetype<MonsterDataViewer>(reader.Pointer + offset)
    if (!reader.IsValidOffset(offset, v.SizeOf())) {
        return _NullMonsterDataViewer
    }
    return v
}

let _NullMonsterDataViewer = changetype<MonsterDataViewer>(changetype<usize>(_Null))
@unmanaged
export class MonsterViewer {
    private _0: u64;

    @inline
    SizeOf(): u32 {
        return 8;
    }
    @inline
    Data(reader: karmem.Reader): MonsterDataViewer {
        let offset: u32 = load<u32>(changetype<usize>(this) + 0);
        if (!reader.IsValidOffset(offset, 152)) {
            return _NullMonsterDataViewer
        }
        let v: MonsterDataViewer = changetype<MonsterDataViewer>(reader.Pointer + offset);
        if (!reader.IsValidOffset(offset, v.SizeOf())) {
            return _NullMonsterDataViewer
        }
        return v
    }
}

@inline export function NewMonsterViewer(reader: karmem.Reader, offset: u32): MonsterViewer {
    if (!reader.IsValidOffset(offset, 8)) {
        return _NullMonsterViewer
    }

    let v: MonsterViewer = changetype<MonsterViewer>(reader.Pointer + offset)
    return v
}

let _NullMonsterViewer = changetype<MonsterViewer>(changetype<usize>(_Null))
@unmanaged
export class MonstersViewer {
    private _0: u64;
    private _1: u64;
    private _2: u64;

    @inline
    SizeOf(): u32 {
        return load<u32>(changetype<usize>(this));
    }
    @inline
    Monsters(reader: karmem.Reader): karmem.Slice<MonsterViewer> {
        if ((<u32>4 + <u32>12) > this.SizeOf()) {
            return new karmem.Slice<MonsterViewer>(0,0,0)
        }
        let offset: u32 = load<u32>(changetype<usize>(this) + 4);
        let size: u32 = load<u32>(changetype<usize>(this) + 4 +4);
        if (!reader.IsValidOffset(offset, size)) {
            return new karmem.Slice<MonsterViewer>(0, 0, 0);
        }
        let length = size / 8;
        if (length > 2000) {
            length = 2000;
        }
        return new karmem.Slice<MonsterViewer>(reader.Pointer + offset, length, 8);
    }
}

@inline export function NewMonstersViewer(reader: karmem.Reader, offset: u32): MonstersViewer {
    if (!reader.IsValidOffset(offset, 8)) {
        return _NullMonstersViewer
    }

    let v: MonstersViewer = changetype<MonstersViewer>(reader.Pointer + offset)
    if (!reader.IsValidOffset(offset, v.SizeOf())) {
        return _NullMonstersViewer
    }
    return v
}

let _NullMonstersViewer = changetype<MonstersViewer>(changetype<usize>(_Null))
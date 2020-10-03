import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Airport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    icao: string;

    @Column("decimal")
    lat: number;

    @Column("decimal")
    lon: number;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    country: string;
}

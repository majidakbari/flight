import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Airport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    icao: string;

    @Column("point")
    geom: string;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    country: string;
}

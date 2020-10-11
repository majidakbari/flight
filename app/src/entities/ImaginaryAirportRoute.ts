import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity()
class ImaginaryAirportRoute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    source: number;

    @Column()
    @Index()
    target: number;

    @Column()
    distance: number
}

export default ImaginaryAirportRoute;

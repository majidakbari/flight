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
}

export default ImaginaryAirportRoute;

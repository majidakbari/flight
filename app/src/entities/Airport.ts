import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Point } from "../valueObjects/point";

@Entity()
export class Airport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    icao: string;

    @Column({
        type: "geometry",
        nullable: false,
        spatialFeatureType: "Point",
        srid: 4326,
        transformer: {
            to(value: any): any {
                return eval(`ST_GeomFromGeoJSON(${JSON.stringify(value)})`);
            },
            from(value: any): any {
                 return {x: value.coordinates[0], y: value.coordinates[1]};
            }
        }
    })
    geom: Point;

    @Column()

    name: string;

    @Column()
    city: string;

    @Column()
    country: string;
}

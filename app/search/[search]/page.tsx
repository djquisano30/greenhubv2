/* eslint-disable @next/next/no-async-client-component */
import { getPlants } from "../api/getPlants";
import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Image,
} from "@nextui-org/react";
import Link from "next/link";

type Params = {
  params: {
    search: string;
  };
};

export default async function PlantSearchPage({ params: { search } }: Params) {
  const PlantsData: Promise<PlantData[]> = getPlants(search);
  const plants = await PlantsData;

  console.log(plants);
  const PlantCard = (
    <div className="grid grid-cols-4">
      {plants.map((plant) => (
        <Link
          key={plant.id}
          href={`/plant/${plant.source}/${plant.id}`}
          className="col-span-1 m-1"
        >
          <Card className="p-0 h-full w-[200px]" isPressable>
            <CardBody className="overflow-visible p-5">
              <Image
                shadow="sm"
                radius="lg"
                alt={plant.common_name}
                className="object-cover h-[140px] w-[200px]"
                src={plant.image}
                isZoomed
              />
            </CardBody>
            <CardFooter className="flex-col text-small justify-between">
              <b>{plant.common_name}</b>
              <p className="text-default-500">{plant.scientific_name}</p>
              <p>{plant.source}</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
  return PlantCard;
}

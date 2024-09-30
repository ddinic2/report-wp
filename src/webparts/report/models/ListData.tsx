import * as React from "react";

export class ListsData {
    MATERIALS_SUB_GROUP: string = 'Materijali podgrupa';
    MATERIALS_SUB_GROUP_FIELDS: string = 'ID, Title';
    CONSTRUCTION_LIST: string = 'Trosak po gradilistu';
    CONSTRUCTION_LIST_FIELDS: string = 'ID, Title';
    CONSTRUCTION_LIST_FILTER_CONSTRUCTION: string = 'IsConstruction';
    PROCUREMENT_ITEMS_LIST: string = 'Stavke nabavke';
    PROCUREMENT_ITEMS_LIST_ITEMS: string = 'ID, Title, Kolicina, Rabat, PDV, Datum, UkupnoSaPDV, GradilisteTrosak/ID, GradilisteTrosak/Title, NazivArtikla/ID, NazivArtikla/Title';
    PROCUREMENT_ITEMS_LIST_ITEMS_EXPAND: string = 'GradilisteTrosak, NazivArtikla'
}
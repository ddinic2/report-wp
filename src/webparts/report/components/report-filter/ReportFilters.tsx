import * as React from "react";
import { useReportFilterStore } from "../../stores/report-filter-store";
import { ComboBox } from "@fluentui/react";
import Service from "../../service/Service";
import { ListsData } from "../../models/ListData";

const ReportFilters = () => {
    const currentYear = new Date().getFullYear()
    const listData = new ListsData()
    const svc = new Service()
    const { year, month, subGroup, place, setYear, setMonth, setPlace, setSubGroup } = useReportFilterStore()
    const [yearOptions] = React.useState<any[]>(svc.makeDropdownFluentFromChoices([currentYear, currentYear - 1, currentYear - 2, currentYear - 3], false))
    const [monthOptions] = React.useState<any[]>(svc.getMonthOptions())
    const [subGroupOptions, setSubGroupOptions] = React.useState<any[]>()
    const [placesOptions, setPlacesOptions] = React.useState<any[]>()

    React.useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const subGroups = await svc.getFieldsFromList(listData.MATERIALS_SUB_GROUP, listData.MATERIALS_SUB_GROUP_FIELDS)
        subGroups.unshift({ID: null, text: ""})
        setSubGroupOptions(subGroups.map(s => { return { key: s.ID, text: s.Title } }))
        const places = await svc.getFromListWithFilter(listData.CONSTRUCTION_LIST, listData.CONSTRUCTION_LIST_FIELDS, listData.CONSTRUCTION_LIST_FILTER_CONSTRUCTION, 1)
        places.unshift({ID: null, text: ""})
        setPlacesOptions(places.map(p => { return { key: p.ID, text: p.Title } }))
    }

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "10px" }}>
                <ComboBox
                    label="Gradiliste"
                    options={placesOptions}
                    onChange={(e, v) => setPlace(Number(v.key))}
                    selectedKey={place}
                    allowFreeInput={false}
                    autoComplete="on"
                />
                <ComboBox
                    label="Mesec"
                    options={monthOptions}
                    onChange={(e, v) => setMonth(Number(v.key))}
                    selectedKey={month}
                    allowFreeInput={false}
                    autoComplete="on"
                />
                <ComboBox
                    label="Godina"
                    options={yearOptions}
                    onChange={(e, v) => setYear(Number(v.key))}
                    selectedKey={year}
                    allowFreeInput={false}
                    autoComplete="on"
                />
                <ComboBox
                    label="Mat. Podgrupa"
                    options={subGroupOptions}
                    onChange={(e, v) => setSubGroup(Number(v.key))}
                    selectedKey={subGroup}
                    allowFreeInput={false}
                    autoComplete="on"
                />
            </div>
        </>
    )
}

export default ReportFilters;
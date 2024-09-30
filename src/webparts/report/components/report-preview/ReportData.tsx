import * as React from "react";
import { useReportFilterStore } from "../../stores/report-filter-store";
import Service from "../../service/Service";
import { ListsData } from "../../models/ListData";
import { Modal } from "office-ui-fabric-react";
import { IconButton, PrimaryButton } from "@fluentui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useBoolean } from '@fluentui/react-hooks';
import { IIconProps, getTheme, mergeStyleSets, FontWeights, IStackProps, IButtonStyles } from '@fluentui/react'
import Loader from "../loader/Loader";

const ReportData = () => {

    const svc = new Service()
    const listData = new ListsData()
    const { month, year, place, subGroup } = useReportFilterStore()
    const [dataForPreview, setDataForPreviw] = React.useState<any[]>()
    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
    const [selectedItem, setSelectedItem] = React.useState<any>()
    const [loader, setLoader] = React.useState(false)

    React.useEffect(() => {
        setLoader(true)
        console.log('CALL DATA!!!')
        getData()
        setLoader(false)
    }, [month, year, place, subGroup])

    const getDate = (type?: string) => {
        let date: Date = null
        if (type === 'start') {
            date = new Date(year, month - 1, 1, 0, 0, 0, 500)
        } else {
            date = new Date(year, month - 1, 31, 23, 59, 59, 500)
        }
        return date.toISOString()
    }

    const getData = async () => {
        let data = await svc.getReportData(listData.PROCUREMENT_ITEMS_LIST, listData.PROCUREMENT_ITEMS_LIST_ITEMS, getDate('start'), getDate('end'), subGroup, place, listData.PROCUREMENT_ITEMS_LIST_ITEMS_EXPAND)
        data = data?.map(d => {
            if (d.GradilisteTrosak && d.GradilisteTrosak.ID) {
                d.gradilisteNaziv = d.GradilisteTrosak.Title;
            } else {
                d.gradilisteNaziv = "Nije svrstano"
            }
            d.UkupnoSaPDV = Number(d.UkupnoSaPDV)
            return d
        })
        console.log('item per date', data)
        const groupedData = data.reduce((acc, item) => {
            const existingGroup = acc.find((group: any) => group.Title === item.gradilisteNaziv);

            if (existingGroup) {
                existingGroup.Amount += item.UkupnoSaPDV
                existingGroup.Items.push(item);
            } else {
                acc.push({
                    Title: item.gradilisteNaziv,
                    Items: [item],
                    Amount: item.UkupnoSaPDV
                });
            }
            return acc;
        }, []);

        console.log('gruped', groupedData);
        setDataForPreviw(groupedData)
    }

    const calculateTotal = () => {
        if (!dataForPreview) return;
        let res = 0;
        dataForPreview.map(d => {
            res += d.Amount
        })
        return res
    }

    const showItems = (data: any) => {
        setSelectedItem(data)
        showModal()
    }

    if (loader) {
        return (
            <>
                <Loader />
            </>
        )
    }

    return (
        <>
            <div className="row">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Gradiliste</th>
                            <th scope="col">Iznos sa PDV</th>
                            <th scope="col">Ukupno stavki</th>
                            <th scope="col">Opcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataForPreview?.map((d, ind) => {
                            return <tr>
                                <th scope="row">{ind + 1}</th>
                                <td>{d.Title}</td>
                                <td>{d.Amount.toLocaleString('en')}</td>
                                <td>{d.Items.length}</td>
                                <td><PrimaryButton onClick={() => showItems(d)}><FontAwesomeIcon icon={faEye} /></PrimaryButton></td>
                            </tr>
                        })}
                        <tr>
                            <th scope="row"></th>
                            <td><strong>Ukupno:</strong></td>
                            <td>{calculateTotal()?.toLocaleString('en')}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="row">
                <Modal
                    titleAriaId={"modal"}
                    isOpen={isModalOpen}
                    onDismiss={hideModal}
                    isBlocking={false}
                    containerClassName={contentStyles.container}
                    dragOptions={undefined}
                >
                    <div className={contentStyles.header}>
                        <h2 className={contentStyles.heading} id={'tit'}>
                            Stavke nabavke za {selectedItem?.Title}
                        </h2>
                        <IconButton
                            styles={iconButtonStyles}
                            iconProps={cancelIcon}
                            ariaLabel="Close popup modal"
                            onClick={hideModal}
                        />
                    </div>
                    <div className={contentStyles.body}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Naziv artikla</th>
                                    <th scope="col">Kolicina</th>
                                    <th scope="col">Ukupno sa PDV</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedItem?.Items?.map((d: any, ind: number) => {
                                    return <tr>
                                        <th scope="row">{ind + 1}</th>
                                        <td>{d.NazivArtikla?.Title}</td>
                                        <td>{d.Kolicina}</td>
                                        <td style={{ textAlign: "right" }}>{d.UkupnoSaPDV.toLocaleString('en')}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </Modal>
            </div>
        </>
    )
}


const cancelIcon: IIconProps = { iconName: 'Cancel' };


const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
    },
    header: [
        // eslint-disable-next-line deprecation/deprecation
        theme.fonts.xLargePlus,
        {
            flex: '1 1 auto',
            borderTop: `4px solid ${theme.palette.themePrimary}`,
            color: theme.palette.neutralPrimary,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '12px 12px 14px 24px',
        },
    ],
    heading: {
        color: theme.palette.neutralPrimary,
        fontWeight: FontWeights.semibold,
        fontSize: 'inherit',
        margin: '0',
    },
    body: {
        flex: '4 4 auto',
        padding: '0 24px 24px 24px',
        overflowY: 'hidden',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
    },
});
const stackProps: Partial<IStackProps> = {
    horizontal: true,
    tokens: { childrenGap: 40 },
    styles: { root: { marginBottom: 20 } },
};
const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        color: theme.palette.neutralPrimary,
        marginLeft: 'auto',
        marginTop: '4px',
        marginRight: '2px',
    },
    rootHovered: {
        color: theme.palette.neutralDark,
    },
};

export default ReportData
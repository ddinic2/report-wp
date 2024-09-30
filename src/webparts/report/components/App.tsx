import * as React from 'react'
import { Routes, Route, HashRouter } from "react-router-dom";
import Loader from './loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import ReportLayout from '../pages/ReportLayout';


const App = ({ context }: any) => {

    const [loader, setLoader] = React.useState(false)

    return (
        <>
            <div className="container-fluid">
                {loader ? <Loader /> :
                    <HashRouter>
                        <Routes>
                            <Route path="/" element={<div>App</div>}></Route>
                            <Route path='/report' element={<ReportLayout />}></Route>
                            {/* <Route path='/add-new/parent-order/:id' element={<AddEditContract setCurrentItem={setCurrentItem} contractTypes={contractTypes} countries={countries} contractLanguages={contractLanguages} allUsers={allUsers} currency={currency} contractors={contractors} updateDataInList={updateDataInList} fromParent={true} />}></Route>
                            <Route path="/edit/:id" element={<AddEditContract setCurrentItem={setCurrentItem} contractTypes={contractTypes} countries={countries} contractLanguages={contractLanguages} allUsers={allUsers} currency={currency} contractors={contractors} updateDataInList={updateDataInList} />}></Route> */}
                            <Route path="*" element={
                                <main style={{ padding: "1rem" }}>
                                    <p>There's nothing here!</p>
                                </main>
                            }
                            >
                            </Route>
                        </Routes>
                    </HashRouter>
                }
            </div>

        </>

    )
}

export default App;
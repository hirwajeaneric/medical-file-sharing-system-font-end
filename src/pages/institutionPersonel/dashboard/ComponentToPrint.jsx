import axios from 'axios'
import React , { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ReportBody, ReportFooter, ReportHeader, ReportPaperContainer } from '../../../components/Dashboard/ReportStyledComponents'

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const params = useParams();
    const [institution, setInstitution] = useState({});


    useEffect(()=> {
    
    },[])

    // Fetching ospital information
    useEffect(() => {
        const reportType = localStorage.getItem('report');
        const userInfo = JSON.parse(localStorage.getItem('instAdmPe'));

        axios.get(`http://localhost:5050/api/mfss/institution/findById?id=${userInfo.institutionId}`)
        .then(response => {
            setInstitution(response.data);
            console.log(response.data);

            // Fetching hospital information according to the filter and request

        })
        .catch(error => console.log(error))
    },[]);


    return (
        <ReportPaperContainer ref={ref}>
            <ReportHeader>
                <img src={`http://localhost:5050/api/mfss/uploads/${institution.logo}`} alt='' />
            </ReportHeader>
            <ReportBody>

            </ReportBody>
            <ReportFooter>

            </ReportFooter>
        </ReportPaperContainer>
    )
})
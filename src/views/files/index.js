import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import moment from 'moment';
import api from 'services/api';
import DownloadLink from './downloadLink';
import { saveAs } from 'file-saver';
import axios from 'axios';
import fileDownload from 'js-file-download';



const DashboardsAnalytic = () => {
    const title = 'Arquivos';
    const description = 'Arquivos';

    const breadcrumbs = [
        { to: '', text: 'Home' },
        { to: 'files', text: 'Arquivos' },
    ]

    const [limit, setLimit] = useState(100)
    const [loading, setLoading] = useState(true)
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [order, setOrder] = useState(false)
    const [orderBy, setOrderBy] = useState('desc')
    const [data, setData] = useState([])
    const [total, setTotal] = useState(false)
    const [privateData, setPrivateData] = useState([])
    const [privateTotal, setPrivateTotal] = useState(false)
    const [searchField, setSearchField] = useState('')
    const [paginationConfig, setPaginationConfig] = useState({
        page: 1
    })

    const loadData = async (pageLimit, page) => {
        document.body.classList.add('spinner')

        pageLimit = limit

        try {
            let url = `/api/v1/private/upload/public?order=${orderBy}&limit=${pageLimit}&page=${page}&search=${searchField}`

            if (startDate && endDate) {
                url += `&start=${moment(startDate).format('YYYY-MM-DD')}&end=${moment(endDate).format('YYYY-MM-DD')}`
            }

            if (order) {
                url += `&order=${orderBy}&order_by=${order}`
            }

            const response = await api.get(url)

            setData(response.data.data)
            setTotal(response.data.total)

            setPaginationConfig({
                previousPage: response.data.data.prev_page_url,
                page: response.data.data.current_page,
                nextPage: response.data.data.next_page_url,
                limit: pageLimit,
                total: response.data.data.last_page,
                lastPage: response.data.data.last_page
            })

        } catch (error) {
            console.log(error)
        }

        try {
            let url = `/api/v1/private/upload/private?order=${orderBy}&limit=${pageLimit}&page=${page}&search=${searchField}`

            if (startDate && endDate) {
                url += `&start=${moment(startDate).format('YYYY-MM-DD')}&end=${moment(endDate).format('YYYY-MM-DD')}`
            }

            if (order) {
                url += `&order=${orderBy}&order_by=${order}`
            }

            const response = await api.get(url)

            setPrivateData(response.data.data)
            setPrivateTotal(response.data.total)



        } catch (error) {
            console.log(error)
        }

        document.body.classList.remove('spinner')

        setLoading(false)
    }

    const orderTable = (param) => {
        setOrder(param)

        if (orderBy === 'asc') {
            setOrderBy('desc')
        } else {
            setOrderBy('asc')
        }
    }

    const changePaginationConfig = async (param, value) => {
        await setPaginationConfig({
            ...paginationConfig, [param]: value
        })
    }

    useEffect(() => {
        if (!data) {
            loadData(paginationConfig.limit, paginationConfig.page)
        }
    }, [paginationConfig.page])

    useEffect(() => {
        if (data) {
            loadData(limit, 1)
        }
    }, [limit])

    useEffect(() => {
        if (data) {
            if (startDate && endDate) {
                loadData(limit, 1)
            }
        }
    }, [endDate, startDate])

    useEffect(() => {
        if (data) {
            loadData(limit, 1)
        }
    }, [order, orderBy])

    const handleSearch = (e) => {
        setSearchField(e.target.value)
    }

    function formatBytes(bytes, decimals = 2) {
        var sizeInMB = (bytes / (1024 * 1024)).toFixed(2);

        return sizeInMB
    }

    function generateFile(url) {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function downloadFile(path, name) {

        axios({
            url: path,
            method: 'GET',
            responseType: 'blob', // importante para converter a resposta em um objeto blob
        }).then((response) => {
            fileDownload(response.data, name); // baixa o arquivo
        });

    }

    return (
        <>
            <HtmlHead title={title} description={description} />
            {/* Title and Top Buttons Start */}
            <div className="page-title-container">
                <Row>
                    {/* Title Start */}
                    <Col md="7">
                        <h1 className="mb-0 pb-0 display-4">{title}</h1>
                        <BreadcrumbList items={breadcrumbs} />
                    </Col>
                    {/* Title End */}
                </Row>
            </div>
            {/* Title and Top Buttons End */}


            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body >
                            <div className='d-flex justify-content-center align-items-center'>
                                <CsLineIcons icon="file-text" className="text-info" size={50} />
                            </div>


                            <div className='d-flex justify-content-center align-items-center mt-4'>
                                <h2 className=" mb-0 text-info text-center">
                                    Arquivos
                                </h2>
                            </div>

                            <p className="text-medium mb-0 text-muted text-white mt-4 text-center">
                                Aqui, você terá acesso a uma variedade de arquivos que podem ser úteis. <br /> Em caso de dúvidas entrem em contato nosso suporte
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <div className='mt-2'>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body >
                                <div className='d-flex justify-content-center align-items-center mt-4'>
                                    <h2 className=" mb-0 text-white text-center">
                                        <CsLineIcons icon="compass" className="text-white" size={25} /> Arquivos públicos
                                    </h2>
                                </div>

                                <p className="text-medium mb-0 text-muted text-white mt-4 text-center mb-4">
                                    Aqui você encontrará nosso acervo de arquivos para download
                                </p>

                                {data.length === 0
                                    ? <>

                                    </>
                                    : <>

                                        <Row className='mt-2'>
                                            <Col xs={4}>
                                                Nome do arquivo
                                            </Col>
                                            <Col xs={2}>
                                                Tamanho
                                            </Col>
                                            <Col xs={2}>
                                                Enviado por
                                            </Col>
                                            <Col xs={2}>
                                                Data
                                            </Col>
                                        </Row>

                                        {data.map((row, index) => {
                                            return (
                                                <div key={index}>
                                                    <div className='mt-4'>

                                                        <Row>
                                                            <Col xs={4}>
                                                                {row.original_name}
                                                            </Col>
                                                            <Col xs={2}>
                                                                {formatBytes(row.size)}
                                                            </Col>
                                                            <Col xs={2}>
                                                                {row.owner.name}
                                                            </Col>
                                                            <Col xs={2}>
                                                                {row.created_at}
                                                            </Col>
                                                            <Col xs={2}>
                                                                <Button onClick={() => downloadFile(row.file, row.original_name)} variant="outline-info" className="btn btn-outline">
                                                                    <CsLineIcons icon="download" />
                                                                </Button>

                                                            </Col>
                                                        </Row>

                                                    </div>

                                                </div>
                                            )
                                        })}
                                    </>
                                }

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>

            <div className='mt-2'>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body >
                                <div className='d-flex justify-content-center align-items-center mt-4'>
                                    <h2 className=" mb-0 text-white text-center">
                                        <CsLineIcons icon="shield" className="text-white" size={25} /> Arquivos privados
                                    </h2>
                                </div>

                                <p className="text-medium mb-0 text-muted text-white mt-4 text-center mb-4">
                                    Aqui você encontrará nosso acervo de arquivos para download
                                </p>

                                {privateData.length === 0
                                    ? <>

                                    </>
                                    : <>

                                        <Row className='mt-2'>
                                            <Col xs={4}>
                                                Nome do arquivo
                                            </Col>
                                            <Col xs={2}>
                                                Tamanho
                                            </Col>
                                            <Col xs={2}>
                                                Enviado por
                                            </Col>
                                            <Col xs={2}>
                                                Data
                                            </Col>
                                        </Row>

                                        {privateData.map((row, index) => {
                                            return (
                                                <div key={index}>
                                                    <div className='mt-4'>

                                                        <Row>
                                                            <Col xs={4}>
                                                                {row.original_name}
                                                            </Col>
                                                            <Col xs={2}>
                                                                {formatBytes(row.size)}
                                                            </Col>
                                                            <Col xs={2}>
                                                                {row.owner.name}
                                                            </Col>
                                                            <Col xs={2}>
                                                                {row.created_at}
                                                            </Col>
                                                            <Col xs={2}>
                                                                <Button onClick={() => downloadFile(row.file, row.original_name)} variant="outline-info" className="btn btn-icon btn-icon-only btn-outline-info mb-1">
                                                                    <CsLineIcons icon="download" />
                                                                </Button>

                                                            </Col>
                                                        </Row>

                                                    </div>

                                                </div>
                                            )
                                        })}
                                    </>
                                }

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default DashboardsAnalytic;

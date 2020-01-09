import React from 'react'

export default class Footer extends React.Component {
    render() {
        return (
            <footer class="page-footer font-small bg-primary pt-4">
                <div class="container">


                    <div class="container-fluid text-center text-md-left">


                        <div class="row">


                            <div class="col-md-6 mt-md-0 mt-3">


                                <h5 class="text-uppercase"><strong>RMIT University</strong></h5>
                                <p>RMIT University (Royal Melbourne Institute of Technology) is originially an Australian public research university in Melbourne, Victoria. </p>

                            </div>


                            <hr class="clearfix w-100 d-md-none pb-3" />


                            <div class="col-md-3 mb-md-0 mb-3">


                                <h5 class="text-uppercase h5-edit">Study at RMIT</h5>

                                <ul class="list-unstyled">
                                    <li>
                                        <a class="ftlink" href="#!">Study areas</a>
                                    </li>
                                    <li>
                                        <a href="#!">Apply to RMIT</a>
                                    </li>
                                    <li>
                                        <a href="#!">International Students</a>
                                    </li>
                                    <li>
                                        <a href="#!">Important dates</a>
                                    </li>
                                </ul>

                            </div>



                            <div class="col-md-3 mb-md-0 mb-3">

                                <h5 class="text-uppercase h5-edit">STUDENT LIFE</h5>

                                <ul class="list-unstyled">
                                    <li>
                                        <a href="#!">Life on campus</a>
                                    </li>
                                    <li>
                                        <a href="#!">Support services</a>
                                    </li>
                                    <li>
                                        <a href="#!">Life and work opportunities</a>
                                    </li>
                                    <li>
                                        <a href="#!">Sports and social clubs</a>
                                    </li>
                                </ul>

                            </div>


                        </div>


                    </div>



                    <div class="footer-copyright text-center py-3">© 2019 Copyright:
  &nbsp; Minh Nguyen - Dat Ngo
                    </div>




                </div>
            </footer>
        )
    }
}
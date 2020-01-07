import React from 'react'

export default class Home extends React.Component {
    render() {
        return (
            <div className="homepage">
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner" role="listbox">

                        <div class="carousel-item active" style={{backgroundImage: "url('https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/rmit-sgs-campus-facilities/2019-campus-photos/sgs-campus-night-04.jpg')"}}>
                            <div class="carousel-caption d-none d-md-block">
                                <h2 class="display-4">RMIT University</h2>
                                <p class="lead">This is a description for the first slide.</p>
                            </div>
                        </div>
                        <div class="carousel-item" style={{backgroundImage: "url('https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/rmit-sgs-campus-facilities/2019-campus-photos/sgs-campus-night-04.jpg')"}}>
                            <div class="carousel-caption d-none d-md-block">
                                <h2 class="display-4">RMIT University</h2>
                                <p class="lead">This is a description for the second slide.</p>
                            </div>
                        </div>

                        <div class="carousel-item" style={{backgroundImage: "url('https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/rmit-sgs-campus-facilities/2019-campus-photos/sgs-campus-night-04.jpg')"}}>
                            <div class="carousel-caption d-none d-md-block">
                                <h2 class="display-4">RMIT University</h2>
                                <p class="lead">This is a description for the third slide.</p>
                            </div>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
                )
            }
}
var jobdata = [
    {
        title: "NASA Internship + Fellowship Program",
        subject: "",
        location: "MD, DC, VA", 
        description: "NASA internships and fellowships leverage NASA’s unique missions and programs to enhance and increase the capability, diversity and size of the nation’s future science, technology, engineering and mathematics (STEM) workforce. Internships are available from high school to graduate level. Internships provide students with the opportunity to participate in either research or other experiential learning, under the guidance of a mentor at NASA. ",
        link: "https://intern.nasa.gov/"
    },
    {
        title: "Google: Computer Science Summer Institute",
        subject: "",
        location: "Online", 
        description: "Google’s Computer Science Summer Institute: Online is a 4-week introduction to computer science for rising college freshmen with a passion for technology - especially students who’ve been historically marginalized from the field. ",
        link: "https://buildyourfuture.withgoogle.com/programs/computer-science-summer-institute/"
    },
];


/*
{
        title: "NASA internship",
        subject: "",
        location: "MD, DC, VA", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut viverra elementum nisi at convallis. Nam ac est quis justo vulputate ultricies. Vivamus tristique malesuada elit nec consectetur. ",
        link: "http://yahoo.com"
    }
    */

$(function(){
    
    showJobLisitings();

    function showJobLisitings() {
        var localjobData = localStorage.hasOwnProperty('jobdata') ? JSON.parse(localStorage.getItem('jobdata')) : jobdata;

        if(!localStorage.hasOwnProperty('jobdata')) {
            localStorage.setItem('jobdata',JSON.stringify(localjobData));
        }

        var jobListStr = "";

        if(localjobData.length > 0) {
            $.each(localjobData, function(i,job) {
                jobListStr += '<div class="card card-body bg-light">';
                jobListStr += '<h1>'+job.title+'</h1>';
                jobListStr += '<h2>'+job.location+'</h2>';
                jobListStr += '<p>'+job.description+'</p>';
                jobListStr += '<p><a target="_blank" href="'+job.link+'">'+job.link+'</a></p>';
                jobListStr += '</div>';
            });
        } else {
            jobListStr = "<h2>No Jobs found!!!</h2>"
        }
        $('#jobListings').html(jobListStr);
    }


   $('#submitJobPosting').on('click',function() {
        var title = $('#title').val();
        var location = $('#location').val();
        var description = $('#description').val();
        var link = $('#link').val();

        var jobObj = {};
            jobObj.title = title;
            jobObj.location = location;
            jobObj.description = description;
            jobObj.link = link;

            //jobdata.push(jobObj);

            //get exisiting Jobs:
            var jobLisiting = JSON.parse(localStorage.getItem('jobdata'))
            jobLisiting.unshift(jobObj);
            localStorage.setItem('jobdata',JSON.stringify(jobLisiting));

            showJobLisitings();

    });


    //JobSearch Listings 

    $('.jobSearch').keyup(function(){

        var jobSearchStr = $(this).val();

        //if(jobSearchStr.length > 3) {
            var jobLisiting = JSON.parse(localStorage.getItem('jobdata'))

            var jobListingsBySearch = [];

            $.each(jobLisiting,function(i,job){ 
                if ((job.title.indexOf(jobSearchStr) !== -1 ) || ((job.location.indexOf(jobSearchStr) !== -1 ) ) || ((job.description.indexOf(jobSearchStr) !== -1 ) ) )   {
                    jobListingsBySearch.push(job);
                }
            })

            var jobListStr = "";
            if(jobListingsBySearch.length > 0) {
                $.each(jobListingsBySearch, function(i,job) {
                    jobListStr += '<div class="card card-body bg-light">';
                    jobListStr += '<h1>'+job.title+'</h1>';
                    jobListStr += '<h2>'+job.location+'</h2>';
                    jobListStr += '<p>'+job.description+'</p>';
                    jobListStr += '<p><a target="_blank" href="'+job.link+'">'+job.link+'</a></p>';
                    jobListStr += '</div>';
                });
            } else {
                jobListStr = "<h2>No Jobs found!!!</h2>"
            }
            $('#jobListings').html('').html(jobListStr);
            
            //showJobLisitings();
        //}
    })
    
})

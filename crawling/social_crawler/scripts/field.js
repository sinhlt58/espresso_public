Post[
    actions=[],
    adminCreator=null,
    allowedAdvertisingObjectives=[],
    application=null,
    attachments=null,
    callToAction=null,
    canReplyPrivately=null,
    caption=null,
    childAttachments=[],
    comments=null,
    commentsCount=0,
    commentsMirroringDomain=null,
    createdTime='Sun Nov 19 11:08:12 ICT 2017',
    description=null,
    feedTargeting=null,
    from=null,
    fullPicture=null,
    icon=null,
    id=1448197635292846_1448717281907548,
    instagramEligibility=null,
    isAppShare=null,
    isExpired=null,
    isHidden=null,
    isInstagramEligible=null,
    isPopular=null,
    isPublished=null,
    isSpherical=null,
    likes=null,
    likesCount=0,
    link=null,
    message='Got new music to throw down so excited to get fiinnaly play these tracks that I have loved since first hearing them.',
    messageTags=[],
    metadata=null,
    multiShareEndCard=null,
    multiShareOptimized=null,
    name=null,
    objectId=null,
    parentId=null,
    permalinkUrl=null,
    picture=null,
    place=null,
    privacy=null,
    promotionStatus=null,
    properties=[],
    reactions=null,
    reactionsCount=0,
    scheduledPublishTime=null,
    shares=null,
    sharesCount=0,
    source=null,
    sponsorTags=[],
    statusType=null,
    story='DJ T-Viruss is feeling blessed.',
    storyTags=[],
    target=null,
    targeting=null,
    timelineVisibility=null,
    to=[],
    type=null,
    updatedTime=null,
    via=null,
    withTags=[]
]

Page[
    // about=null,
    accessToken=null,
    adminNotes=[],
    // affiliation=null,
    // appId=null,
    // artistsWeLike=null,
    assetScore=null,
    // attire=null,
    // awards=null,
    // bandInterests=null,
    // bandMembers=null,
    bestPage=null,
    // bio=null,
    // birthday=null,
    // bookingAgent=null,
    // built=null,
    business=null,
    // canCheckin=null,
    // canPost=null,
    // category=null,
    // categoryList=[],
    // checkins=null,
    // companyOverview=null,
    connectedInstagramAccount=null,
    // contactAddress=null,
    // countryPageLikes=null,
    // cover=null,
    // culinaryTeam=null,
    // currentLocation=null,
    // description=null,
    // descriptionHtml=null,
    // directedBy=null,
    // displaySubtext=null,
    // emails=[],
    // engagement=null,
    // fanCount=null,
    // featuredVideo=null,
    // features=null,
    // foodStyles=[],
    // founded=null,
    // generalInfo=null,
    // generalManager=null,
    // genre=null,
    // globalBrandPageName=null,
    // globalBrandParentPage=null,
    // globalBrandRootId=null,
    // hasAddedApp=null,
    // hasWhatsappNumber=null,
    // hometown=null,
    // hours=null,
    // id=397075287017147,
    // impressum=null,
    // influences=null,
    instagramBusinessAccount=null,
    instantArticlesReviewStatus=null,
    // isAlwaysOpen=null,
    // isChain=null,
    // isCommunityPage=null,
    // isPermanentlyClosed=null,
    // isPublished=null,
    // isUnclaimed=null,
    // isVerified=null,
    // isWebhooksSubscribed=null,
    labels=[],
    lastUsedTime=null,
    // leadgenTosAccepted=null,
    likes=null,// connection
    likesCount=null,
    // link=null,
    // location=null,
    // members=null,
    metadata=null,
    // mission=null,
    // mpg=null,
    // name='VirussQueen - Fernanda',
    // nameWithLocationDescriptor=null,
    // network=null,
    // newLikeCount=null,
    // offerEligible=null,
    ownerBusiness=null,
    // parking=null,
    // paymentOptions=null,
    // personalInfo=null,
    // personalInterests=null,
    // pharmaSafetyInfo=null,
    // phone=null,
    picture=null,// connection
    // placeType=null,
    // plotOutline=null,
    // pressContact=null,
    // priceRange=null,
    // producedBy=null,
    // products=null,
    promotionEligible=null,
    // promotionIneligibleReason=null,
    // publicTransit=null,
    // recordLabel=null,
    // releaseDate=null,
    // restaurantServices=null,
    // restaurantSpecialties=null,
    // schedule=null,
    // screenNames=[],
    // screenplayBy=null,
    // season=null,
    // singleLineAddress=null,
    // starring=null,
    // startInfo=null,
    // storeNumber=null,
    // studio=null,
    // talkingAboutCount=null,
    // type=null,
    // unreadMessageCount=null,
    // unreadNotifCount=null,
    // unseenMessageCount=null,
    // username=null,
    // verificationStatus=null,
    // voipInfo=null,
    // website=null,
    // wereHereCount=null,
    // whatsappNumber=null,
    // writtenBy=null
]

Comment[
    attachment=null,
    canComment=null,
    canHide=null,
    canLike=null,
    canRemove=null,
    canReplyPrivately=null,
    commentCount=0,
    comments=null,
    createdTime='Fri Dec 28 11:31:00 ICT 2018',
    from=null,
    id=1494959467306378_1494974957304829,
    isHidden=null,
    likeCount=null,
    likes=null,
    message='Giời ơi tui vote hồi sáng rồi ông ơi 😂',
    messageTags=[],
    metadata=null,
    object=null,
    parent=null,
    permalinkUrl=null,
    privateReplyConversation=null,
    reactions=null,
    type=null,
    userLikes=null
]

,
    {
      "class": "com.uet.crawling.social.facebook.services.GetPosts",
      "name": "GetPosts",
      "params": {
        "typeResult": "get_posts",
        "typeBuildToIndex": "post_basic",
        "typesBuildToStatus": "get_comments",
        "limit": 100,
        "index": false,
        "indexStatus": true,
        "fields": "id,message"
      }
    },
    {
      "class": "com.uet.crawling.social.facebook.services.GetComments",
      "name": "GetComments",
      "params": {
        "typeResult": "get_comments",
        "typeBuildToIndex": "comment_basic",
        "typesBuildToStatus": "get_sub_comments",
        "limit": 100,
        "index": false,
        "indexStatus": false,
        "fields": "id,message"
      }
    }

    // "about,affiliation,artists_we_like,attire,awards,band_interests,band_members,bio,birthday,booking_agent,built,can_checkin,can_post,category,category_list,checkins,company_overview,contact_address,country_page_likes,cover,culinary_team,current_location,description,description_html,directed_by,display_subtext,emails,engagement,fan_count,featured_video,features,founded,general_info,general_manager,genre,global_brand_page_name,global_brand_root_id,has_added_app,has_whatsapp_number,hometown,hours,id,impressum,influences,is_always_open,is_chain,is_community_page,is_permanently_closed,is_published,is_unclaimed,is_webhooks_subscribed,leadgen_tos_accepted,link,location,members,mission,mpg,name,network,new_like_count,offer_eligible,parking,payment_options,personal_info,personal_interests,pharma_safety_info,phone,place_type,press_contact,price_range,produced_by,products,promotion_ineligible_reason,public_transit,record_label,release_date,restaurant_services,restaurant_specialties,schedule,screenplay_by,season,single_line_address,starring,store_number,studio,talking_about_count,unread_message_count,unread_notif_count,unseen_message_count,username,verification_status,website,were_here_count,whatsapp_number,written_by,overall_star_rating,voip_info,displayed_message_response_time,food_styles,is_eligible_for_branded_content,is_messenger_bot_get_started_enabled,is_messenger_platform_bot,is_owned,leadgen_has_fat_ping_crm_integration,leadgen_tos_acceptance_time,leadgen_tos_accepting_user,merchant_review_status,messenger_ads_default_icebreakers,messenger_ads_default_page_welcome_message,messenger_ads_default_quick_replies,messenger_ads_quick_replies_type,name_with_location_descriptor,page_token,parent_page,plot_outline,privacy_info_url,rating_count,start_info,store_code"
    // ,messenger_ads_default_icebreakers,// loi khi vao filed nay, co nhung page ko co
    // page_about_story // moi bi loai ra









    {
        "com.uet.crawling.social.facebook.ResultServices": [
          {
            "class": "com.uet.crawling.social.facebook.services.SearchPages",
            "name": "SearchPages",
            "params": {
              "typeResult": "search_pages",
              "typeBuildToIndex": "page",
              "typeBuildToStatus": "get_posts",
              "limit": 100,
              "index": true,
              "indexStatus": true,
              "fields": [
                {
                  "typeInfo": "page_basic_info",
                  "data": [
                    {
                      "typeCast": "String",
                      "fieldsGet": [
                        "about","affiliation","attire","awards",
                        "birthday",
                        "category","current_location",
                        "description","description_html","display_subtext",
                        "founded",
                        "general_info",
                        "id","impressum",
                        "link",
                        "members",
                        "name","name_with_location_descriptor",
                        "personal_info","personal_interests",
                        "pharma_safety_info","phone",
                        "place_type","products","promotion_ineligible_reason",
                        "single_line_address","store_number",
                        "username",
                        "verification_status",
                        "website","whatsapp_number"
                      ]
                    },
                    {
                      "typeCast": "Boolean",
                      "fieldsGet": [
                        "can_checkin","can_post"
                      ]
                    },
                    {
                      "typeCast": "List<Category>",
                      "fieldsGet": [
                        "category_list"
                      ]
                    },
                    {
                      "typeCast": "Integer",
                      "fieldsGet": [
                        "checkins",
                        "country_page_likes"
                      ]
                    },
                    {
                      "typeCast": "Page.MailingAddress",
                      "fieldsGet": [
                        "contact_address"
                      ]
                    },
                    {
                      "typeCast": "List<String>",
                      "fieldsGet": [
                        "emails"
                      ]
                    }
                  ]
                },
                {
                  "typeInfo": "artists",
                  "data": [
                    {
                      "typeCast": "String",
                      "fieldsGet": [
                        "artists_we_like",
                        "name",
                        "band_interests",
                        "band_members",
                        "bio",
                        "booking_agent",
                        "global_brand_page_name",
                        "global_brand_root_id",
                        "hometown",
                        "influences",
                        "press_contact",
                        "record_label"
                      ]
                    }
                  ]
                },
                {
                  "typeInfo": "vehicle",
                  "data": [
                    {
                      "typeCast": "String",
                      "fieldsGet": [
                        "built",
                        "features"
                      ]
                    }
                  ]
                },
                {
                  "typeInfo": "business",
                  "data": [
                    {
                      "typeCast": "String",
                      "fieldsGet": [
                        "built",
                        "company_overview",
                        "culinary_team",
                        "general_manager",
                        "mission",
                        "price_range",
                        "public_transit"
                      ]
                    }
                  ]
                },
                {
                  "typeInfo": "film",
                  "data": [
                    {
                      "typeCast": "String",
                      "fieldsGet": [
                        "directed_by",
                        "genre",
                        "plot_out_line",
                        "produced_by",
                        "release_date",
                        "screenplay_by",
                        "starring",
                        "studio"
                      ]
                    }
                  ]
                },
                {
                  "typeInfo": "tv_show",
                  "data": [
                    {
                      "typeCast": "String",
                      "fieldsGet": [
                        "network",
                        "schedule",
                        "season",
                        "written_by"
                      ]
                    }
                  ]
                }
              ]
      
            }
          }
        ]
      }
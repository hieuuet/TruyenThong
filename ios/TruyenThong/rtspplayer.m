//
//  rtspplayer.m
//  IJKPlayerTest
//
//  Created by Tran Trung Hieu on 2/26/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "rtspplayer.h"
#import <React/RCTLog.h>
#import "AppDelegate.h"
#import "IJKDemoSampleViewController.h"
#import "IJKCommon.h"
#import "IJKMoviePlayerViewController.h"
#import "IJKDemoSampleViewController.h"

@implementation rtspplayer
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSArray *) cameraList)
{
  //RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
//  if([delg.rootViewController isKindOfClass:[UINavigationController class]]){
//
//  }else{
//    [delg.rootViewController presentViewController:playervc animated:YES completion:^{
//
//    }];
//  }

//  [delg.navigationController pushViewController:playervc animated:YES];
  
  dispatch_async(dispatch_get_main_queue(), ^{
    
    IJKDemoSampleViewController * playervc = [[IJKDemoSampleViewController alloc] initWithNibName:@"IJKDemoSampleViewController" bundle:nil];
    playervc.linkRTSP = cameraList;
    UIApplication *app = [UIApplication sharedApplication];
    AppDelegate *delg =  (AppDelegate*)app.delegate;
//    [delg.rootViewController presentViewController:playervc animated:YES completion:nil];
    [delg.rootViewController pushViewController:playervc animated:YES];

  });
  
  
}
@end

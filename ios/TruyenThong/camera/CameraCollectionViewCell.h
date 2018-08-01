//
//  CameraCollectionViewCell.h
//  TruyenThong
//
//  Created by KienND on 2018/04/02.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AVFoundation/AVFoundation.h"
#import "IJKMoviePlayer2ViewController.h"
#import "IJKCommon.h"

@interface CameraCollectionViewCell : UICollectionViewCell
//@property (strong, nonatomic) AVPlayer *player;
@property (strong, nonatomic) IJKFFMoviePlayerController * player;
@property (strong, nonatomic) NSString *url;
- (void) play;
- (void) stop;
@end

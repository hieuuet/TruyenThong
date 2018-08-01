//
//  CameraCollectionViewCell.m
//  TruyenThong
//
//  Created by KienND on 2018/04/02.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "CameraCollectionViewCell.h"

@interface CameraCollectionViewCell(){

}
@end

@implementation CameraCollectionViewCell

- (void)awakeFromNib {
    [super awakeFromNib];

    // Initialization code
}


- (void) play{
  [self playStream];
}

- (void) stop{
  NSLog(@"Stop ....");
  [self stopPlayer];
}

- (void) stopPlayer{
  [self.player shutdown];
  [self.player.view removeFromSuperview];
  self.player = nil;
}

- (void) playStream{
  
  if(self.url != nil && self.url.length > 0){
    IJKFFOptions *options = [IJKFFOptions optionsByDefault];
    
    self.player = [[IJKFFMoviePlayerController alloc] initWithContentURL:[NSURL URLWithString:self.url] withOptions:options];
    self.player.view.frame = self.bounds;
    self.player.scalingMode = IJKMPMovieScalingModeAspectFit;
    self.player.shouldAutoplay = YES;
    [self addSubview:self.player.view];
    [self.player prepareToPlay];
    NSLog(@"Play ....");
  }
  
}

- (void) setUrl:(NSString *)url{
  _url = url;
  
}

- (void) removeFromSuperview{
  [super removeFromSuperview];
  [self stopPlayer];
}

@end

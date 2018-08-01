//
//  SimpleTableCell.m
//  IJKPlayerTest
//
//  Created by Tran Trung Hieu on 3/15/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "SimpleTableCell.h"

@implementation SimpleTableCell



- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

- (id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier {
  self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
  if (self) {
    
    
    [IJKFFMoviePlayerController checkIfFFmpegVersionMatch:YES];
    // [IJKFFMoviePlayerController checkIfPlayerVersionMatch:YES major:1 minor:0 micro:0];
    
    IJKFFOptions *options = [IJKFFOptions optionsByDefault];
    
    self.player = [[IJKFFMoviePlayerController alloc] init];
    self.player.view.autoresizingMask = UIViewAutoresizingFlexibleWidth|UIViewAutoresizingFlexibleHeight;
    self.player.scalingMode = IJKMPMovieScalingModeAspectFit;
    self.player.shouldAutoplay = YES;
    
    [self.contentView addSubview:self.player.view];

//    self.movie = [[MPMoviePlayerController alloc] init];
//    self.movie.controlStyle = MPMovieControlStyleNone;
//    self.movie.scalingMode = MPMovieScalingModeAspectFit;
//    [self.contentView addSubview:self.movie.view];
  }
  return self;
}
- (void)layoutSubviews {
  [super layoutSubviews];
  self.player.view.frame = self.bounds;
}
@end

//
//  SimpleTableCell.h
//  IJKPlayerTest
//
//  Created by Tran Trung Hieu on 3/15/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <IJKMediaFramework/IJKMediaFramework.h>


@interface SimpleTableCell : UITableViewCell

@property(atomic, retain) id<IJKMediaPlayback> player;

@end

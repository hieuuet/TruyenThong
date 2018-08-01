/*
 * Copyright (C) 2013-2015 Zhang Rui <bbcallen@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#import "IJKDemoSampleViewController.h"

#import "IJKCommon.h"
//#import "IJKVideoViewController.h"
#import "IJKMoviePlayer2ViewController.h"
#import "IJKMoviePlayerViewController.h"
#import "AppDelegate.h"
#import "SimpleTableCell.h"
#import <AVFoundation/AVFoundation.h>
#import "CameraCollectionViewCell.h"

@interface IJKDemoSampleViewController ()<UICollectionViewDelegate,UICollectionViewDataSource>

{

  float size;
  CGFloat itemSpacing;

}

@property (weak, nonatomic) IBOutlet UIPageControl *pageControl;
@property (weak, nonatomic) IBOutlet UICollectionView *cameraCollection;
@end

@implementation IJKDemoSampleViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  
  self.title = @"Danh sách camera";

  size = 1;
  itemSpacing = 0;
  
  [self.cameraCollection registerNib:[UINib nibWithNibName:@"CameraCollectionViewCell" bundle:nil] forCellWithReuseIdentifier:@"CameraCollectionViewCell"];
  UICollectionViewFlowLayout *layout = self.cameraCollection.collectionViewLayout;
  layout.minimumLineSpacing = 0;
  layout.minimumInteritemSpacing = 0;
  
  UIImage *navBg = [[UIImage imageNamed:@"nav_bg"]
   resizableImageWithCapInsets:UIEdgeInsetsMake(0, 0, 0, 0) resizingMode:UIImageResizingModeStretch];
  
  [[UINavigationBar appearance] setBackgroundImage:navBg forBarMetrics:UIBarMetricsDefault];
  [[UINavigationBar appearance] setBackgroundImage:navBg forBarMetrics:UIBarMetricsCompact];
  [self.navigationController.navigationBar setTitleTextAttributes:
   @{NSForegroundColorAttributeName:[UIColor whiteColor]}];
  
  
  

  
}

-(void)viewWillDisappear:(BOOL)animated{
  [super viewWillDisappear:animated];
    [[self navigationController] setNavigationBarHidden:YES animated:NO];
}

- (void) viewDidDisappear:(BOOL)animated
{
  [super viewDidDisappear:animated];
}
-(void)viewDidAppear:(BOOL)animated{
  [super viewDidAppear:animated];
  
}
- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    [[self navigationController] setNavigationBarHidden:NO animated:NO];
    [self refreshPageIndicator];
}



#pragma mark collectionview datasource - delegate


- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section
{
  
  long count = self.linkRTSP.count;
  
  int pageSize = size + size;
  
  if(count % pageSize == 0){
    return count;
  }else{
    return count + pageSize - count % pageSize;
  }
  
  

}

// The cell that is returned must be retrieved from a call to -dequeueReusableCellWithReuseIdentifier:forIndexPath:
- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath
{
  CameraCollectionViewCell *cell=[collectionView dequeueReusableCellWithReuseIdentifier:@"CameraCollectionViewCell" forIndexPath:indexPath];
  
  long newIndex = 0;
  
  if(size == 1){
    newIndex = indexPath.row;
  }else{ // size == 2;
    long pageSize = size * size;
    long currentPage = indexPath.row / pageSize;
    long pageItemId = indexPath.row - currentPage*pageSize;
    
    //    int column = pageItemId / size +1;
    //    int row =  pageItemId - (column-1) *size;
    
    if(pageItemId == 1){
      pageItemId = 2;
    }else if(pageItemId == 2){
      pageItemId = 1;
    }
    newIndex = pageItemId + currentPage*pageSize;
    
  }
  
  
  if(newIndex < self.linkRTSP.count){
    
    NSDictionary *cameraInfo = self.linkRTSP[newIndex];
    
    cell.url = cameraInfo[@"url_local"];

  }else{
    cell.url = nil;
  }

  
  
  
  return cell;
}

- (CGSize)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout*)collectionViewLayout sizeForItemAtIndexPath:(NSIndexPath *)indexPath
{
  CGFloat cellWith = collectionView.bounds.size.width/size;
  CGFloat cellHeight = (collectionView.bounds.size.height) /size;
  
  return CGSizeMake(cellWith, cellHeight);
}


- (void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath{
  
  
  long newIndex = 0;
  
  if(size == 1){
    newIndex = indexPath.row;
  }else{ // size == 2;
    long pageSize = size * size;
    long currentPage = indexPath.row / pageSize;
    long pageItemId = indexPath.row - currentPage*pageSize;
    
    //    int column = pageItemId / size +1;
    //    int row =  pageItemId - (column-1) *size;
    
    if(pageItemId == 1){
      pageItemId = 2;
    }else if(pageItemId == 2){
      pageItemId = 1;
    }
    newIndex = pageItemId + currentPage*pageSize;
    
  }
  NSLog(@"Select %ld",newIndex);
  
  
  if(newIndex >= self.linkRTSP.count){
    return;
  }
  
  
  
  
  NSDictionary *cameraInfo = self.linkRTSP[newIndex];
  NSURL   *url  = [NSURL URLWithString:cameraInfo[@"url_local"]];
  AppDelegate *delg =  (AppDelegate*)[UIApplication sharedApplication].delegate;
  IJKVideoViewController * playervc = [[IJKVideoViewController alloc] initWithURL:url];
  
  [self.navigationController pushViewController:playervc animated:YES];
  
  
}

- (void)collectionView:(UICollectionView *)collectionView
  didEndDisplayingCell:(UICollectionViewCell *)cell
    forItemAtIndexPath:(NSIndexPath *)indexPath{
  CameraCollectionViewCell *camCell = (CameraCollectionViewCell*)cell;
  [camCell stop];
  
}

- (void)collectionView:(UICollectionView *)collectionView
       willDisplayCell:(UICollectionViewCell *)cell
    forItemAtIndexPath:(NSIndexPath *)indexPath{
  CameraCollectionViewCell *camCell = (CameraCollectionViewCell*)cell;
  [camCell play];
}


-(void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView
{
  NSLog(@"scrollViewDidEndDecelerating");
  
  
  CGFloat pageWidth = self.cameraCollection.frame.size.width;
  float currentPage = self.cameraCollection.contentOffset.x / pageWidth;
  
  if (0.0f != fmodf(currentPage, 1.0f))
  {
    self.pageControl.currentPage = currentPage + 1;
  }
  else
  {
    self.pageControl.currentPage = currentPage;
  }
  
  NSLog(@"Page Number : %ld", (long)self.pageControl.currentPage);
}

#pragma mark collection view cell paddings
//- (UIEdgeInsets)collectionView:(UICollectionView*)collectionView layout:(UICollectionViewLayout *)collectionViewLayout insetForSectionAtIndex:(NSInteger)section {
//  return UIEdgeInsetsMake(0, 0, 0, 0); // top, left, bottom, right
//}
//
//- (CGSize)collectionView:(UICollectionView *)collectionView
//                  layout:(UICollectionViewLayout *)collectionViewLayout
//referenceSizeForHeaderInSection:(NSInteger)section{
//  return CGSizeZero;
//}

//- (CGFloat)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout*)collectionViewLayout minimumInteritemSpacingForSectionAtIndex:(NSInteger)section {
//
//  return itemSpacing;
//}

#pragma mark actions

- (void) refreshPageIndicator{
  
        self.pageControl.numberOfPages = (self.linkRTSP.count - 1) / (size * size) +1;
}

- (IBAction)to1X1:(id)sender {
  size = 1;
  
  
  [self.cameraCollection performBatchUpdates:^{
    UIButton *btn = (UIButton*) sender;
    btn.enabled = NO;
    [self refreshPageIndicator];
    [self.cameraCollection reloadSections:[NSIndexSet indexSetWithIndex:0]];
    [self.cameraCollection layoutIfNeeded];
    
  } completion:^(BOOL finished){
    UIButton *btn = (UIButton*) sender;
    btn.enabled = YES;
  }];
  
  
}
- (IBAction)to2X2:(id)sender {
  size = 2;
  
  [self.cameraCollection performBatchUpdates:^{
    UIButton *btn = (UIButton*) sender;
    btn.enabled = NO;
    [self.cameraCollection reloadSections:[NSIndexSet indexSetWithIndex:0]];
    [self.cameraCollection layoutIfNeeded];
    [self refreshPageIndicator];
  } completion:^(BOOL finished){
    UIButton *btn = (UIButton*) sender;
    btn.enabled = YES;
  }];
}
- (IBAction)to3X3:(id)sender {
  size = 3;
  
  [self.cameraCollection performBatchUpdates:^{
    [self.cameraCollection reloadSections:[NSIndexSet indexSetWithIndex:0]];
        [self refreshPageIndicator];
  } completion:nil];
}

- (IBAction)to4X4:(id)sender {
  size = 4;
  
  [self.cameraCollection performBatchUpdates:^{
    [self.cameraCollection reloadSections:[NSIndexSet indexSetWithIndex:0]];
    [self refreshPageIndicator];
  } completion:nil];
}

@end

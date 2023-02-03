import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Query, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.schema';


@Controller('blog')
export class BlogController {

 constructor(private blogService: BlogService) { }

 @Get('posts')
 
 @UseGuards(AuthGuard('jwt'))
 async getPosts(@Res() res, @Req() req) {
  console.log(req.user)
  const posts = await this.blogService.getPosts();
  return res.status(HttpStatus.OK).json(posts);
 }

 @Get('post/:postID')
 @UseGuards(AuthGuard('jwt'))
 async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
  const post = await this.blogService.getPost(postID);
  if (!post) throw new NotFoundException('Post does not exist!');
  return res.status(HttpStatus.OK).json(post);

 }

 @Post('/post')
 @UseGuards(AuthGuard('jwt'))
 async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO, @Req() req) {
  const newPost = await this.blogService.addPost(createPostDTO,req.user);
  return res.status(HttpStatus.OK).json({
   message: "Post has been submitted successfully!",
   post: newPost
  })
 }
 @Put('/edit')
 @UseGuards(AuthGuard('jwt'))
 async editPost(
  @Res() res,
  @Query('postID', new ValidateObjectId()) postID,
  @Body() createPostDTO: CreatePostDTO
 ) {
  const editedPost = await this.blogService.editPost(postID, createPostDTO);
  if (!editedPost) throw new NotFoundException('Post does not exist!');
  return res.status(HttpStatus.OK).json({
   message: 'Post has been successfully updated',
   post: editedPost
  })
 }
 @Delete('/delete')
 @UseGuards(AuthGuard('jwt'))
 async deletePost(@Res()
  res, @Query('postID', new ValidateObjectId()) postID) {
  const deletedPost = await this.blogService.deletePost(postID);
  if (!deletedPost) throw new NotFoundException('Post does not exist!');
  return res.status(HttpStatus.OK).json({
   message: 'Post has been deleted!',
   post: deletedPost
  })
 }
}
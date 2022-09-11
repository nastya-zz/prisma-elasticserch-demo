import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { BasicResponse } from '../response/basic-response';
import { UserNotFoundException } from '../user/exceptions/userNotFound.exception';

import { container } from 'tsyringe';

import { AuthController } from '../controllers';
import { PostController } from '../controllers';
import { CategoryController } from '../controllers';
import { CommentController } from '../controllers';

import { AuthService } from '../services';
import { PostService } from '../services';
import { CategoryService } from '../services';
import { CommentService } from '../services';

// Register controllers
container.register('AuthController', {
  useClass: AuthController,
});
container.register('PostController', {
  useClass: PostController,
});
container.register('CategoryController', {
  useClass: CategoryController,
});
container.register('CommentController', {
  useClass: CommentController,
});

// Register services
container.register('AuthService', {
  useClass: AuthService,
});

container.register('PostService', {
  useClass: PostService,
});

container.register('CategoryService', {
  useClass: CategoryService,
});

container.register('CommentService', {
  useClass: CommentService,
});

export default container;
